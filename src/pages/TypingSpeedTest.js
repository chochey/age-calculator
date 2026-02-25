import { useState, useRef, useCallback, useEffect } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

const sampleParagraphs = [
  "The quick brown fox jumps over the lazy dog near the riverbank. Every morning, the fox would stretch and prepare for another day of exploring the vast meadows and dense forests that surrounded its cozy den beneath the old oak tree.",
  "Programming is the art of telling a computer what to do. A good programmer writes code that humans can understand. Clean code is not written by following a set of rules. You learn to write clean code by practicing and working on real projects over many years.",
  "The ocean waves crashed against the rocky shore as the sun began to set on the horizon. Seagulls circled overhead, calling out to one another while the salty breeze carried the scent of the sea across the sandy beach and into the nearby village.",
  "Technology has transformed the way we communicate with each other. From handwritten letters to instant messaging, our methods of staying connected have evolved dramatically. Despite these changes, the fundamental desire to share ideas and feelings remains the same.",
  "A balanced diet is essential for maintaining good health and well-being. Eating a variety of fruits, vegetables, whole grains, and lean proteins provides the body with the nutrients it needs. Regular exercise combined with proper nutrition leads to a healthier and more fulfilling life.",
  "Space exploration has always captured the imagination of humanity. From the first moon landing to modern missions to Mars, each step forward reveals new mysteries about our universe. Scientists continue to push boundaries, seeking answers to questions that have fascinated us for centuries.",
  "Music has a unique power to bring people together across cultures and generations. Whether it is a classical symphony, a jazz improvisation, or a catchy pop song, melodies and rhythms can evoke deep emotions and create lasting memories that transcend spoken language.",
  "The art of cooking involves much more than simply following a recipe. It requires creativity, patience, and an understanding of how different flavors and textures work together. A skilled chef can transform simple ingredients into extraordinary dishes that delight both the eyes and the palate.",
  "Reading books opens doors to new worlds and perspectives. Through fiction, we experience lives different from our own. Through nonfiction, we deepen our understanding of history, science, and the human condition. Every page turned is a step toward greater knowledge and empathy.",
  "Mountains have long been symbols of challenge and achievement. Climbers spend months preparing for expeditions, testing their physical and mental limits against the forces of nature. Reaching the summit is not just about the view from the top but about the journey and perseverance it took to get there.",
];

function getRandomParagraph(excludeIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * sampleParagraphs.length);
  } while (idx === excludeIndex && sampleParagraphs.length > 1);
  return { text: sampleParagraphs[idx], index: idx };
}

function TypingSpeedTest() {
  const [paragraphIndex, setParagraphIndex] = useState(-1);
  const [currentText, setCurrentText] = useState(sampleParagraphs[0]);
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize with a random paragraph
  useEffect(() => {
    const { text, index } = getRandomParagraph(-1);
    setCurrentText(text);
    setParagraphIndex(index);
  }, []);

  // Timer tick
  useEffect(() => {
    if (isActive && !isFinished) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((Date.now() - startTime) / 1000);
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, isFinished, startTime]);

  const handleInput = useCallback((e) => {
    const value = e.target.value;

    // Start timer on first keystroke
    if (!isActive && !isFinished) {
      const now = Date.now();
      setStartTime(now);
      setIsActive(true);
    }

    // Don't allow typing past the text length
    if (value.length > currentText.length) return;

    setTyped(value);

    // Check if finished
    if (value.length === currentText.length) {
      const now = Date.now();
      setIsActive(false);
      setIsFinished(true);
      clearInterval(timerRef.current);
      setElapsedSeconds((now - (startTime || now)) / 1000);
    }
  }, [isActive, isFinished, currentText, startTime]);

  const handleReset = useCallback(() => {
    clearInterval(timerRef.current);
    const { text, index } = getRandomParagraph(paragraphIndex);
    setCurrentText(text);
    setParagraphIndex(index);
    setTyped('');
    setStartTime(null);
    setElapsedSeconds(0);
    setIsActive(false);
    setIsFinished(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [paragraphIndex]);

  // Calculate stats
  const correctChars = typed.split('').filter((ch, i) => ch === currentText[i]).length;
  const incorrectChars = typed.length - correctChars;
  const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;

  const timeInMinutes = elapsedSeconds / 60;
  // WPM: standard word = 5 characters
  const grossWpm = timeInMinutes > 0 ? Math.round((typed.length / 5) / timeInMinutes) : 0;
  const netWpm = timeInMinutes > 0 ? Math.max(0, Math.round(((typed.length / 5) - incorrectChars) / timeInMinutes)) : 0;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  // Render the sample text with character-by-character highlighting
  const renderSampleText = () => {
    return currentText.split('').map((char, i) => {
      let style = {};
      if (i < typed.length) {
        if (typed[i] === char) {
          style = { color: '#16a34a', backgroundColor: '#f0fdf4' };
        } else {
          style = { color: '#dc2626', backgroundColor: '#fef2f2', textDecoration: 'underline' };
        }
      } else if (i === typed.length) {
        style = { borderLeft: '2px solid #4f46e5', marginLeft: '-1px' };
      }
      return (
        <span key={i} style={style}>
          {char}
        </span>
      );
    });
  };

  return (
    <div>
      <Seo
        title="Typing Speed Test \u2013 QuickCalcs"
        description="Test your typing speed with this free online WPM typing test. See your words per minute, accuracy, and improve your typing skills."
      />
      <h1>Typing Speed Test</h1>
      <p className="subtitle">Test your typing speed and accuracy.</p>

      {/* Live stats bar */}
      {(isActive || isFinished) && (
        <div className="detail-grid" style={{ marginBottom: '1.25rem' }}>
          <div className="detail-card">
            <span className="detail-value" style={{ color: '#4f46e5' }}>{netWpm}</span>
            <span className="detail-label">WPM (Net)</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{accuracy}%</span>
            <span className="detail-label">Accuracy</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{formatTime(elapsedSeconds)}</span>
            <span className="detail-label">Time</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">{typed.length}/{currentText.length}</span>
            <span className="detail-label">Characters</span>
          </div>
        </div>
      )}

      {/* Sample text display */}
      {!isFinished && (
        <>
          <div
            style={{
              fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
              fontSize: '1.1rem',
              lineHeight: '1.9',
              padding: '1.25rem',
              background: '#fff',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              marginBottom: '1rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              userSelect: 'none',
            }}
            onClick={() => inputRef.current && inputRef.current.focus()}
          >
            {renderSampleText()}
          </div>

          {/* Hidden-ish textarea for input */}
          <textarea
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={isActive ? '' : 'Start typing here to begin the test...'}
            className="word-textarea code-textarea"
            style={{
              minHeight: '80px',
              resize: 'none',
            }}
          />

          {!isActive && typed.length === 0 && (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              The timer starts when you begin typing.
            </p>
          )}
        </>
      )}

      {/* Results screen */}
      {isFinished && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{netWpm}</span>
            <span className="age-label">WPM</span>
            <span className="age-number">{accuracy}%</span>
            <span className="age-label">Accuracy</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card highlight">
              <span className="detail-value">{grossWpm}</span>
              <span className="detail-label">Gross WPM</span>
            </div>
            <div className="detail-card highlight">
              <span className="detail-value">{netWpm}</span>
              <span className="detail-label">Net WPM</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#16a34a' }}>{correctChars}</span>
              <span className="detail-label">Correct Characters</span>
            </div>
            <div className="detail-card">
              <span className="detail-value" style={{ color: '#dc2626' }}>{incorrectChars}</span>
              <span className="detail-label">Incorrect Characters</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{formatTime(elapsedSeconds)}</span>
              <span className="detail-label">Time Elapsed</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{currentText.length}</span>
              <span className="detail-label">Total Characters</span>
            </div>
          </div>

          {/* Speed rating */}
          <div className="calc-section" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Your Speed Rating</h2>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#475569', margin: 0 }}>
              {netWpm < 20 && 'Beginner - Keep practicing to build your speed!'}
              {netWpm >= 20 && netWpm < 40 && 'Average - You are on the right track!'}
              {netWpm >= 40 && netWpm < 60 && 'Above Average - Solid typing speed!'}
              {netWpm >= 60 && netWpm < 80 && 'Fast - You type faster than most people!'}
              {netWpm >= 80 && netWpm < 100 && 'Professional - Excellent typing speed!'}
              {netWpm >= 100 && 'Expert - You are a typing master!'}
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button onClick={handleReset} className="form-btn" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Reset button while typing */}
      {isActive && (
        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <button onClick={handleReset} className="form-btn secondary">
            Restart
          </button>
        </div>
      )}

      <RelatedTools current="/typing-speed-test" />

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>
          This free typing speed test measures how fast and accurately you can type. Your words per minute (WPM) score is calculated using the standard method where one word equals five characters. The test begins automatically when you start typing and tracks your progress in real time.
        </p>
        <p>
          The test displays both Gross WPM (total words typed per minute) and Net WPM (adjusted for errors). Net WPM gives you a more accurate picture of your effective typing speed since it accounts for mistakes you make along the way.
        </p>

        <h2>How It Works</h2>
        <p>
          A random paragraph is displayed on screen. Simply start typing the text exactly as shown. The timer begins on your first keystroke. As you type, each character is highlighted green for correct or red for incorrect, so you get instant visual feedback. Once you type all the characters, the test ends and your complete results are shown.
        </p>

        <h2>Understanding Your Results</h2>
        <ul>
          <li><strong>Net WPM</strong> - Your effective typing speed after accounting for errors. This is the most meaningful metric.</li>
          <li><strong>Gross WPM</strong> - Total raw typing speed before error adjustments.</li>
          <li><strong>Accuracy</strong> - The percentage of characters you typed correctly.</li>
          <li><strong>Time Elapsed</strong> - How long it took you to complete the passage.</li>
        </ul>

        <h2>Average Typing Speeds</h2>
        <ul>
          <li><strong>Beginner:</strong> Under 20 WPM</li>
          <li><strong>Average:</strong> 20 to 40 WPM</li>
          <li><strong>Above Average:</strong> 40 to 60 WPM</li>
          <li><strong>Fast:</strong> 60 to 80 WPM</li>
          <li><strong>Professional:</strong> 80 to 100 WPM</li>
          <li><strong>Expert:</strong> Over 100 WPM</li>
        </ul>
      </div>
    </div>
  );
}

export default TypingSpeedTest;
