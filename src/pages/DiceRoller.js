import { useState, useCallback } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];

const DICE_COLORS = {
  4: '#ef4444',
  6: '#f59e0b',
  8: '#10b981',
  10: '#3b82f6',
  12: '#8b5cf6',
  20: '#ec4899',
  100: '#6366f1',
};

const PRESETS = [
  { label: '2d6', dice: 6, count: 2, modifier: 0, dropLowest: false },
  { label: '1d20', dice: 20, count: 1, modifier: 0, dropLowest: false },
  { label: '3d8+5', dice: 8, count: 3, modifier: 5, dropLowest: false },
  { label: '4d6 drop lowest', dice: 6, count: 4, modifier: 0, dropLowest: true },
];

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function DiceRoller() {
  const [diceType, setDiceType] = useState(20);
  const [diceCount, setDiceCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [dropLowest, setDropLowest] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [rolling, setRolling] = useState(false);

  const doRoll = useCallback((type, count, mod, drop) => {
    setRolling(true);

    setTimeout(() => {
      const rolls = Array.from({ length: count }, () => rollDice(type));
      let kept = [...rolls];
      let droppedIndex = -1;

      if (drop && count > 1) {
        const minVal = Math.min(...rolls);
        droppedIndex = rolls.indexOf(minVal);
        kept = rolls.filter((_, i) => i !== droppedIndex);
      }

      const subtotal = kept.reduce((a, b) => a + b, 0);
      const total = subtotal + mod;

      const result = {
        diceType: type,
        diceCount: count,
        modifier: mod,
        dropLowest: drop,
        rolls,
        kept,
        droppedIndex,
        total,
        label: `${count}d${type}${drop ? ' drop lowest' : ''}${mod > 0 ? '+' + mod : mod < 0 ? mod : ''}`,
        timestamp: new Date().toLocaleTimeString(),
      };

      setResults(result);
      setHistory((prev) => [result, ...prev].slice(0, 10));
      setRolling(false);
    }, 400);
  }, []);

  const handleRoll = useCallback(() => {
    doRoll(diceType, diceCount, modifier, dropLowest);
  }, [diceType, diceCount, modifier, dropLowest, doRoll]);

  const applyPreset = useCallback((preset) => {
    setDiceType(preset.dice);
    setDiceCount(preset.count);
    setModifier(preset.modifier);
    setDropLowest(preset.dropLowest);
    doRoll(preset.dice, preset.count, preset.modifier, preset.dropLowest);
  }, [doRoll]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const dieStyle = (sides, value, isDropped) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sides === 100 ? 56 : 48,
    height: sides === 100 ? 56 : 48,
    borderRadius: sides === 100 || sides === 10 ? '50%' : sides === 4 ? 0 : 8,
    background: isDropped ? '#e2e8f0' : DICE_COLORS[sides],
    color: isDropped ? '#94a3b8' : '#fff',
    fontWeight: 800,
    fontSize: sides === 100 ? '0.9rem' : '1.15rem',
    textDecoration: isDropped ? 'line-through' : 'none',
    opacity: isDropped ? 0.5 : 1,
    fontFamily: "'Consolas', 'Monaco', monospace",
    position: 'relative',
    boxShadow: isDropped ? 'none' : '0 2px 8px rgba(0,0,0,0.18)',
    transition: 'transform 0.2s',
    ...(sides === 4 ? {
      width: 0,
      height: 0,
      borderLeft: '26px solid transparent',
      borderRight: '26px solid transparent',
      borderBottom: `48px solid ${isDropped ? '#e2e8f0' : DICE_COLORS[sides]}`,
      borderRadius: 0,
      background: 'transparent',
      color: 'transparent',
      position: 'relative',
    } : {}),
  });

  const d4TextStyle = (isDropped) => ({
    position: 'absolute',
    top: 18,
    left: '50%',
    transform: 'translateX(-50%)',
    color: isDropped ? '#94a3b8' : '#fff',
    fontWeight: 800,
    fontSize: '0.95rem',
    textDecoration: isDropped ? 'line-through' : 'none',
    fontFamily: "'Consolas', 'Monaco', monospace",
  });

  return (
    <div>
      <Seo title="Dice Roller – QuickCalcs" description="Free online dice roller. Roll any dice type — d4, d6, d8, d10, d12, d20, d100. Perfect for D&D, tabletop games, and probability." />
      <h1>Dice Roller</h1>
      <p className="subtitle">Roll any dice for tabletop games, D&D & more.</p>

      {/* Dice Type Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>Dice Type</label>
        <div className="unit-toggle" style={{ flexWrap: 'wrap' }}>
          {DICE_TYPES.map((d) => (
            <button
              key={d}
              className={diceType === d ? 'active' : ''}
              onClick={() => setDiceType(d)}
              style={diceType === d ? { borderColor: DICE_COLORS[d], background: DICE_COLORS[d], color: '#fff' } : {}}
            >
              d{d}
            </button>
          ))}
        </div>
      </div>

      {/* Count & Modifier */}
      <div className="form" style={{ marginBottom: '1rem' }}>
        <div className="input-row">
          <div className="input-group">
            <label>Number of Dice</label>
            <input
              type="number"
              min="1"
              max="20"
              value={diceCount}
              onChange={(e) => setDiceCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            />
          </div>
          <div className="input-group">
            <label>Modifier (+/-)</label>
            <input
              type="number"
              min="-999"
              max="999"
              value={modifier}
              onChange={(e) => setModifier(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={dropLowest}
            onChange={(e) => setDropLowest(e.target.checked)}
          />
          Drop lowest die
        </label>
      </div>

      {/* Roll Button */}
      <button
        className="form-btn"
        onClick={handleRoll}
        disabled={rolling}
        style={{
          width: '100%',
          padding: '0.85rem',
          fontSize: '1.1rem',
          marginBottom: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {rolling ? 'Rolling...' : `Roll ${diceCount}d${diceType}${dropLowest ? ' (drop lowest)' : ''}${modifier > 0 ? ' +' + modifier : modifier < 0 ? ' ' + modifier : ''}`}
      </button>

      {/* Presets */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Quick Presets</label>
        <div className="preset-row" style={{ flexWrap: 'wrap' }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              className={`preset-btn${diceType === p.dice && diceCount === p.count && modifier === p.modifier && dropLowest === p.dropLowest ? ' active' : ''}`}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="results" key={results.timestamp + results.total}>
          <div className="primary-result" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <span className="age-label" style={{ opacity: 1 }}>{results.label}</span>
            <span className="age-number" style={{ fontSize: '3rem' }}>{results.total}</span>
            <span className="age-label">Total</span>
          </div>

          {/* Individual Dice */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.75rem' }}>Individual Rolls</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {results.rolls.map((val, i) => {
                const isDropped = results.dropLowest && i === results.droppedIndex;
                return (
                  <div key={i} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {results.diceType === 4 ? (
                      <div style={dieStyle(results.diceType, val, isDropped)}>
                        <span style={d4TextStyle(isDropped)}>{val}</span>
                      </div>
                    ) : (
                      <div style={dieStyle(results.diceType, val, isDropped)}>
                        {val}
                      </div>
                    )}
                    {isDropped && (
                      <span style={{
                        position: 'absolute',
                        bottom: -18,
                        fontSize: '0.65rem',
                        color: '#94a3b8',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}>dropped</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown */}
          <div className="detail-grid" style={{ gridTemplateColumns: results.dropLowest ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">{results.rolls.join(' + ')}</span>
              <span className="detail-label">Rolls</span>
            </div>
            {results.dropLowest && (
              <div className="detail-card">
                <span className="detail-value">{results.kept.join(' + ')}</span>
                <span className="detail-label">After Dropping Lowest</span>
              </div>
            )}
            <div className="detail-card">
              <span className="detail-value">
                {results.kept.reduce((a, b) => a + b, 0)}
                {results.modifier !== 0 && (
                  <span style={{ color: results.modifier > 0 ? '#10b981' : '#ef4444' }}>
                    {' '}{results.modifier > 0 ? '+' : ''}{results.modifier}
                  </span>
                )}
                {' = '}{results.total}
              </span>
              <span className="detail-label">Calculation</span>
            </div>
          </div>

          {/* Stats for multi-dice */}
          {results.diceCount > 1 && (
            <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="detail-card">
                <span className="detail-value">{Math.min(...results.rolls)}</span>
                <span className="detail-label">Lowest</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{Math.max(...results.rolls)}</span>
                <span className="detail-label">Highest</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{(results.rolls.reduce((a, b) => a + b, 0) / results.rolls.length).toFixed(1)}</span>
                <span className="detail-label">Average</span>
              </div>
              <div className="detail-card">
                <span className="detail-value">{results.rolls.reduce((a, b) => a + b, 0)}</span>
                <span className="detail-label">Sum (raw)</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Roll History */}
      {history.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>Roll History</label>
            <button className="form-btn secondary" onClick={clearHistory} style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
              Clear
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {history.map((h, i) => (
              <div
                key={i}
                className="random-results"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 1rem',
                  opacity: i === 0 ? 1 : 0.7 + (0.3 * (1 - i / history.length)),
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    minWidth: 20,
                  }}>
                    #{history.length - i}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>{h.label}</span>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {h.rolls.map((val, j) => {
                      const isDropped = h.dropLowest && j === h.droppedIndex;
                      return (
                        <span
                          key={j}
                          className="random-num"
                          style={{
                            fontSize: '0.85rem',
                            padding: '0.2rem 0.5rem',
                            opacity: isDropped ? 0.4 : 1,
                            textDecoration: isDropped ? 'line-through' : 'none',
                            background: isDropped ? '#f1f5f9' : undefined,
                            color: isDropped ? '#94a3b8' : undefined,
                          }}
                        >
                          {val}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    color: '#4f46e5',
                  }}>
                    {h.total}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{h.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <RelatedTools current="/dice-roller" />

      <div className="info-section">
        <h2>How to Use the Dice Roller</h2>
        <p>Start by selecting a dice type from the row of buttons at the top -- d4, d6, d8, d10, d12, d20, or d100. Then set how many dice to roll (1 through 20) and an optional positive or negative modifier. If you want to discard the lowest die in a multi-dice roll, check the "Drop lowest die" box. Click the Roll button to generate your results instantly. Each roll displays the individual die values with color-coded icons, the calculated total, and a breakdown showing how the final number was derived. When rolling multiple dice, you also see statistics for the lowest roll, highest roll, average, and raw sum.</p>
        <p>For quick access to common setups, use the preset buttons: "2d6" for standard board-game rolls, "1d20" for a single D&D check, "3d8+5" for a typical damage roll with a modifier, and "4d6 drop lowest" for the classic ability score generation method. The roll history panel keeps your last 10 results so you can review past rolls during a game session.</p>

        <h2>How the Dice Roller Works</h2>
        <p>Each die is simulated by generating a random integer between 1 and the number of sides using JavaScript's Math.random() function. For a d20, that means each face has an equal 1-in-20 (5%) chance of appearing. When "drop lowest" is enabled, the tool identifies the die with the smallest value, visually strikes it through, and excludes it from the total. The modifier is then added to (or subtracted from) the sum of the kept dice to produce the final result. Roll history entries record the dice type, individual values, total, and timestamp so you have a clear audit trail for your game.</p>

        <h2>Supported Dice Types</h2>
        <ul>
          <li><strong>d4</strong> -- Tetrahedron, used for dagger damage and magic missile in D&D.</li>
          <li><strong>d6</strong> -- Standard cube, the most common die for board games and ability score generation (4d6 drop lowest).</li>
          <li><strong>d8</strong> -- Octahedron, common for longsword damage and healing spells.</li>
          <li><strong>d10</strong> -- Pentagonal trapezohedron, used for damage dice and as part of percentile rolls.</li>
          <li><strong>d12</strong> -- Dodecahedron, used for greataxe damage and barbarian hit dice.</li>
          <li><strong>d20</strong> -- Icosahedron, the iconic D&D die for attack rolls, saving throws, and ability checks.</li>
          <li><strong>d100</strong> -- Percentile die, used for random encounter tables and wild magic surges.</li>
        </ul>

        <h3>How do I generate D&D 5e ability scores with this tool?</h3>
        <p>Select d6, set the number of dice to 4, check "Drop lowest die," and set the modifier to 0. Click Roll six times, once for each ability score. Each roll gives you the sum of the three highest dice out of four, which is the standard method described in the D&D 5e Player's Handbook. Results typically range from 3 to 18, with an average around 12.2, producing slightly above-average characters compared to a flat 3d6 method.</p>

        <h3>What is the average result for each dice type?</h3>
        <p>The average roll for any fair die is (minimum + maximum) / 2. For a d4 that is 2.5, for a d6 it is 3.5, d8 is 4.5, d10 is 5.5, d12 is 6.5, d20 is 10.5, and d100 is 50.5. When rolling multiple dice, multiply the single-die average by the number of dice and add your modifier. For example, 2d6+3 has an average of 3.5 + 3.5 + 3 = 10.</p>

        <h3>Can I use this for games other than Dungeons and Dragons?</h3>
        <p>Absolutely. The dice roller supports all standard polyhedral dice used across tabletop RPGs including Pathfinder, Shadowrun, GURPS, Call of Cthulhu, and Warhammer. The d6 is also the standard die for board games like Monopoly, Risk, and Settlers of Catan. The d100 (percentile die) is useful for any system with percentage-based skill checks. And because you can adjust the dice count, modifier, and drop-lowest setting, virtually any dice notation can be replicated.</p>
      </div>
    </div>
  );
}

export default DiceRoller;
