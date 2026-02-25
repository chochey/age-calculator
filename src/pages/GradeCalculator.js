import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const letterGrades = [
  { letter: 'A+', min: 97 },
  { letter: 'A',  min: 93 },
  { letter: 'A-', min: 90 },
  { letter: 'B+', min: 87 },
  { letter: 'B',  min: 83 },
  { letter: 'B-', min: 80 },
  { letter: 'C+', min: 77 },
  { letter: 'C',  min: 73 },
  { letter: 'C-', min: 70 },
  { letter: 'D+', min: 67 },
  { letter: 'D',  min: 63 },
  { letter: 'D-', min: 60 },
  { letter: 'F',  min: 0 },
];

function getLetterGrade(score) {
  for (const g of letterGrades) {
    if (score >= g.min) return g.letter;
  }
  return 'F';
}

function getLetterColor(letter) {
  if (letter.startsWith('A')) return '#16a34a';
  if (letter.startsWith('B')) return '#2563eb';
  if (letter.startsWith('C')) return '#d97706';
  if (letter.startsWith('D')) return '#ea580c';
  return '#dc2626';
}

function GradeCalculator() {
  const [rows, setRows] = useState([
    { name: '', grade: '', weight: '' },
    { name: '', grade: '', weight: '' },
    { name: '', grade: '', weight: '' },
  ]);

  const [targetGrade, setTargetGrade] = useState('90');

  const updateRow = (i, field, value) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [field]: value };
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { name: '', grade: '', weight: '' }]);
  const removeRow = (i) => setRows(rows.filter((_, j) => j !== i));

  // Calculations
  const validRows = rows.filter(
    (r) => r.grade !== '' && r.weight !== '' && !isNaN(r.grade) && !isNaN(r.weight) && Number(r.weight) > 0
  );
  const totalWeight = validRows.reduce((s, r) => s + Number(r.weight), 0);
  const weightedSum = validRows.reduce((s, r) => s + Number(r.grade) * Number(r.weight), 0);
  const weightedAverage = totalWeight > 0 ? weightedSum / totalWeight : null;
  const remainingWeight = 100 - totalWeight;

  // "What do I need?" calculation
  const targetNum = parseFloat(targetGrade);
  let neededScore = null;
  if (weightedAverage !== null && remainingWeight > 0 && !isNaN(targetNum)) {
    neededScore = ((targetNum * 100) - weightedSum) / remainingWeight;
  }

  // Target thresholds for A, B, C
  const targets = [
    { label: 'A (93%)', value: 93 },
    { label: 'B (83%)', value: 83 },
    { label: 'C (73%)', value: 73 },
  ];

  const neededForTargets = targets.map((t) => {
    if (totalWeight <= 0 || remainingWeight <= 0) return { ...t, needed: null };
    const needed = ((t.value * 100) - weightedSum) / remainingWeight;
    return { ...t, needed };
  });

  return (
    <div>
      <Seo
        title="Grade Calculator – QuickCalcs"
        description="Free weighted grade calculator. Calculate your class grade with weighted assignments. Find out what grade you need on your final exam."
      />
      <h1>Grade Calculator</h1>
      <p className="subtitle">Calculate your weighted grade and find out what you need.</p>

      {/* Overall Results */}
      {weightedAverage !== null && (
        <div className="results" style={{ marginBottom: '1.5rem' }}>
          <div className="primary-result">
            <span className="age-number">{weightedAverage.toFixed(2)}%</span>
            <span className="age-label">Weighted Average</span>
            <span
              className="age-number"
              style={{
                fontSize: '2rem',
                background: getLetterColor(getLetterGrade(weightedAverage)),
                padding: '0.15rem 0.75rem',
                borderRadius: '8px',
              }}
            >
              {getLetterGrade(weightedAverage)}
            </span>
          </div>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">{totalWeight}%</span>
              <span className="detail-label">Weight Used</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{remainingWeight}%</span>
              <span className="detail-label">Weight Remaining</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{validRows.length}</span>
              <span className="detail-label">Assignments</span>
            </div>
          </div>
        </div>
      )}

      {/* Grade Rows */}
      <div className="gpa-courses">
        <div className="gpa-row" style={{ marginBottom: '0.25rem' }}>
          <span className="gpa-name" style={{ border: 'none', padding: '0 0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>
            Assignment
          </span>
          <span className="gpa-grade" style={{ border: 'none', padding: '0 0.4rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', flex: '0 0 80px', textAlign: 'center' }}>
            Grade %
          </span>
          <span className="gpa-credits" style={{ border: 'none', fontWeight: 700, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', flex: '0 0 80px' }}>
            Weight %
          </span>
          <span style={{ width: '30px' }}></span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="gpa-row">
            <input
              type="text"
              placeholder={`Assignment ${i + 1}`}
              value={r.name}
              onChange={(e) => updateRow(i, 'name', e.target.value)}
              className="gpa-name"
            />
            <input
              type="number"
              min="0"
              max="200"
              step="any"
              placeholder="Grade"
              value={r.grade}
              onChange={(e) => updateRow(i, 'grade', e.target.value)}
              className="gpa-credits"
              style={{ flex: '0 0 80px' }}
            />
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              placeholder="Weight"
              value={r.weight}
              onChange={(e) => updateRow(i, 'weight', e.target.value)}
              className="gpa-credits"
              style={{ flex: '0 0 80px' }}
            />
            {rows.length > 1 && (
              <button onClick={() => removeRow(i)} className="gpa-remove">&times;</button>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button onClick={addRow} className="form-btn">+ Add Row</button>
        <button
          onClick={() => setRows([{ name: '', grade: '', weight: '' }, { name: '', grade: '', weight: '' }, { name: '', grade: '', weight: '' }])}
          className="form-btn secondary"
        >
          Reset
        </button>
      </div>

      {totalWeight > 100 && (
        <div className="error" style={{ marginTop: '1rem' }}>
          Total weight exceeds 100%. Please adjust your weights.
        </div>
      )}

      {/* What Do I Need? Section */}
      {weightedAverage !== null && remainingWeight > 0 && (
        <div className="calc-section" style={{ marginTop: '1.5rem' }}>
          <h2>What Grade Do I Need?</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            Based on your current <strong>{weightedAverage.toFixed(2)}%</strong> average
            with <strong>{remainingWeight}%</strong> of weight remaining.
          </p>

          <div className="form" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <label style={{ whiteSpace: 'nowrap' }}>Target grade:</label>
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
              style={{ width: '80px', padding: '0.6rem 0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' }}
            />
            <span style={{ color: '#64748b' }}>%</span>
          </div>

          {neededScore !== null && (
            <div className="calc-result">
              {neededScore <= 100 && neededScore >= 0
                ? `You need ${neededScore.toFixed(2)}% on the remaining ${remainingWeight}% to get a ${targetGrade}% (${getLetterGrade(targetNum)}).`
                : neededScore > 100
                  ? `You would need ${neededScore.toFixed(2)}% on the remaining ${remainingWeight}% — that's above 100%, so a ${targetGrade}% overall may not be achievable.`
                  : `You've already secured above ${targetGrade}%! Any score of 0% or above will keep you there.`
              }
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Quick Targets</h3>
            <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {neededForTargets.map((t) => (
                <div key={t.label} className="detail-card">
                  <span className="detail-value" style={{ color: t.needed !== null && t.needed <= 100 ? '#16a34a' : t.needed !== null && t.needed > 100 ? '#dc2626' : '#64748b' }}>
                    {t.needed !== null ? (t.needed < 0 ? 'Secured' : `${t.needed.toFixed(1)}%`) : '—'}
                  </span>
                  <span className="detail-label">Needed for {t.label}</span>
                  {t.needed !== null && t.needed > 100 && (
                    <span style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.15rem' }}>Not possible</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Letter Grade Scale Reference */}
      {weightedAverage !== null && (
        <div className="calc-section" style={{ marginTop: '1rem' }}>
          <h2>Letter Grade Scale</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.35rem', marginTop: '0.5rem' }}>
            {letterGrades.map((g) => {
              const isActive = getLetterGrade(weightedAverage) === g.letter;
              return (
                <div
                  key={g.letter}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? '#4f46e5' : '#f8fafc',
                    color: isActive ? '#fff' : '#475569',
                    border: isActive ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{g.letter}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{g.min}%+</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <RelatedTools current="/grade-calculator" />

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>
          The Grade Calculator helps you compute your weighted class grade by combining
          individual assignment scores with their respective weights. Whether you have
          homework, quizzes, midterms, and finals each worth a different percentage of your
          total grade, this tool handles the math for you.
        </p>

        <h2>How Weighted Grades Work</h2>
        <p>
          A weighted grade is calculated by multiplying each assignment's score by its weight,
          summing those products, and dividing by the total weight. For example, if your midterm
          (worth 30%) was a 90% and your final (worth 40%) was an 85%, the weighted average for
          those two would be: (90 x 30 + 85 x 40) / (30 + 40) = 87.14%.
        </p>

        <h2>What Grade Do I Need on My Final?</h2>
        <p>
          Use the "What Grade Do I Need?" section to determine the minimum score required
          on remaining assignments to reach your target grade. Enter your current grades and
          weights, and the calculator will show what you need on the remaining portion of
          your course weight to achieve an A, B, or C, or any custom target you set.
        </p>

        <h2>Letter Grade Scale</h2>
        <ul>
          <li><strong>A+ </strong> = 97 - 100% | <strong>A</strong> = 93 - 96% | <strong>A-</strong> = 90 - 92%</li>
          <li><strong>B+ </strong> = 87 - 89% | <strong>B</strong> = 83 - 86% | <strong>B-</strong> = 80 - 82%</li>
          <li><strong>C+ </strong> = 77 - 79% | <strong>C</strong> = 73 - 76% | <strong>C-</strong> = 70 - 72%</li>
          <li><strong>D+ </strong> = 67 - 69% | <strong>D</strong> = 63 - 66% | <strong>D-</strong> = 60 - 62%</li>
          <li><strong>F</strong> = Below 60%</li>
        </ul>
      </div>
    </div>
  );
}

export default GradeCalculator;
