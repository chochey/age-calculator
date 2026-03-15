import { useState, useEffect, useRef, useCallback } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

const SESSION_TYPES = {
  WORK: 'Work',
  SHORT_BREAK: 'Short Break',
  LONG_BREAK: 'Long Break',
};

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beeps = [
      { freq: 830, start: 0, dur: 0.15 },
      { freq: 830, start: 0.2, dur: 0.15 },
      { freq: 830, start: 0.4, dur: 0.15 },
      { freq: 1050, start: 0.6, dur: 0.3 },
    ];
    beeps.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.35, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    });
  } catch (e) {
    // Web Audio API not supported
  }
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [workSessionsBeforeLong, setWorkSessionsBeforeLong] = useState(0);

  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);
  const timeLeftRef = useRef(timeLeft);

  const getDurationForSession = useCallback((type) => {
    switch (type) {
      case SESSION_TYPES.WORK: return workDuration * 60;
      case SESSION_TYPES.SHORT_BREAK: return shortBreakDuration * 60;
      case SESSION_TYPES.LONG_BREAK: return longBreakDuration * 60;
      default: return workDuration * 60;
    }
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advanceSession = useCallback(() => {
    playBeep();
    clearTimer();

    if (sessionType === SESSION_TYPES.WORK) {
      const newCount = workSessionsBeforeLong + 1;
      setCompletedPomodoros((prev) => prev + 1);

      if (newCount >= 4) {
        setSessionType(SESSION_TYPES.LONG_BREAK);
        setTimeLeft(longBreakDuration * 60);
        setWorkSessionsBeforeLong(0);
      } else {
        setSessionType(SESSION_TYPES.SHORT_BREAK);
        setTimeLeft(shortBreakDuration * 60);
        setWorkSessionsBeforeLong(newCount);
      }
    } else {
      setSessionType(SESSION_TYPES.WORK);
      setTimeLeft(workDuration * 60);
    }

    setRunning(false);
  }, [sessionType, workSessionsBeforeLong, clearTimer, workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    if (!running) {
      clearTimer();
      return;
    }

    endTimeRef.current = Date.now() + timeLeftRef.current * 1000;

    intervalRef.current = setInterval(() => {
      const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        advanceSession();
      } else {
        setTimeLeft(remaining);
      }
    }, 250);

    return clearTimer;
  }, [running, clearTimer, advanceSession]);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const handleStart = useCallback(() => {
    if (timeLeft <= 0) return;
    setRunning(true);
  }, [timeLeft]);

  const handlePause = useCallback(() => {
    setRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setRunning(false);
    clearTimer();
    setTimeLeft(getDurationForSession(sessionType));
  }, [clearTimer, getDurationForSession, sessionType]);

  const handleFullReset = useCallback(() => {
    setRunning(false);
    clearTimer();
    setSessionType(SESSION_TYPES.WORK);
    setTimeLeft(workDuration * 60);
    setCompletedPomodoros(0);
    setWorkSessionsBeforeLong(0);
  }, [clearTimer, workDuration]);

  const handleSkip = useCallback(() => {
    setRunning(false);
    clearTimer();

    if (sessionType === SESSION_TYPES.WORK) {
      const newCount = workSessionsBeforeLong + 1;
      if (newCount >= 4) {
        setSessionType(SESSION_TYPES.LONG_BREAK);
        setTimeLeft(longBreakDuration * 60);
        setWorkSessionsBeforeLong(0);
      } else {
        setSessionType(SESSION_TYPES.SHORT_BREAK);
        setTimeLeft(shortBreakDuration * 60);
        setWorkSessionsBeforeLong(newCount);
      }
    } else {
      setSessionType(SESSION_TYPES.WORK);
      setTimeLeft(workDuration * 60);
    }
  }, [sessionType, workSessionsBeforeLong, clearTimer, workDuration, shortBreakDuration, longBreakDuration]);

  const handleDurationChange = useCallback((type, value) => {
    const num = Math.max(1, Math.min(120, parseInt(value, 10) || 1));
    if (type === 'work') {
      setWorkDuration(num);
      if (sessionType === SESSION_TYPES.WORK && !running) {
        setTimeLeft(num * 60);
      }
    } else if (type === 'shortBreak') {
      setShortBreakDuration(num);
      if (sessionType === SESSION_TYPES.SHORT_BREAK && !running) {
        setTimeLeft(num * 60);
      }
    } else if (type === 'longBreak') {
      setLongBreakDuration(num);
      if (sessionType === SESSION_TYPES.LONG_BREAK && !running) {
        setTimeLeft(num * 60);
      }
    }
  }, [sessionType, running]);

  const totalDuration = getDurationForSession(sessionType);
  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  const sessionColor =
    sessionType === SESSION_TYPES.WORK ? '#4f46e5' :
    sessionType === SESSION_TYPES.SHORT_BREAK ? '#16a34a' :
    '#f59e0b';

  const sessionBg =
    sessionType === SESSION_TYPES.WORK ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' :
    sessionType === SESSION_TYPES.SHORT_BREAK ? 'linear-gradient(135deg, #16a34a, #22d3ee)' :
    'linear-gradient(135deg, #f59e0b, #ef4444)';

  return (
    <div>
      <Seo
        title="Pomodoro Timer – QuickCalcs"
        description="Free online Pomodoro timer for productivity. Customizable work and break intervals. Stay focused with the Pomodoro technique."
        faqs={[{ q: 'Can I change the work and break durations?', a: 'Yes. Scroll to the "Timer Settings" section below the timer to adjust the work duration (1 to 120 minutes), short break duration, and long break duration. Changes take effect immediately when the timer is paused. For deep-focus tasks like writing or programming, many users prefer 45- or 50-minute work blocks paired with 10-minute breaks. For lighter tasks or study sessions, the classic 25/5 split works well.' }, { q: 'What happens after four work sessions?', a: 'The Pomodoro Technique recommends a longer break after every four work intervals. This timer tracks your progress with visual dots -- once all four are filled, the next break is automatically set to the long break duration (15 minutes by default). After the long break, the cycle resets and you start a new set of four. This pattern prevents the gradual decline in focus that occurs when people try to power through hours of uninterrupted work.' }, { q: 'Will the timer alert me when a session ends?', a: 'Yes. The timer plays an audio notification using your browser\'s Web Audio API when each session completes. You will hear a sequence of short beeps to get your attention. Make sure your device volume is turned up and that your browser allows audio playback. The timer also visually indicates the transition by changing the session type label and resetting the progress ring, so you will notice even if your sound is off.' }]}
      />
      <h1>Pomodoro Timer</h1>
      <p className="subtitle">Stay focused with timed work and break intervals.</p>

      {/* Session Type Indicator */}
      <div className="unit-toggle" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
        <button
          className={sessionType === SESSION_TYPES.WORK ? 'active' : ''}
          onClick={() => { if (!running) { setSessionType(SESSION_TYPES.WORK); setTimeLeft(workDuration * 60); } }}
          style={sessionType === SESSION_TYPES.WORK ? { borderColor: '#4f46e5', background: '#eef2ff', color: '#4f46e5' } : {}}
        >
          Work
        </button>
        <button
          className={sessionType === SESSION_TYPES.SHORT_BREAK ? 'active' : ''}
          onClick={() => { if (!running) { setSessionType(SESSION_TYPES.SHORT_BREAK); setTimeLeft(shortBreakDuration * 60); } }}
          style={sessionType === SESSION_TYPES.SHORT_BREAK ? { borderColor: '#16a34a', background: '#f0fdf4', color: '#16a34a' } : {}}
        >
          Short Break
        </button>
        <button
          className={sessionType === SESSION_TYPES.LONG_BREAK ? 'active' : ''}
          onClick={() => { if (!running) { setSessionType(SESSION_TYPES.LONG_BREAK); setTimeLeft(longBreakDuration * 60); } }}
          style={sessionType === SESSION_TYPES.LONG_BREAK ? { borderColor: '#f59e0b', background: '#fffbeb', color: '#f59e0b' } : {}}
        >
          Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="stopwatch-display">
        <div style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: sessionColor,
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          {sessionType}
        </div>

        {/* Progress Ring */}
        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 1.25rem' }}>
          <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="110" cy="110" r="100" fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
              cx="110" cy="110" r="100" fill="none"
              stroke={sessionColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <div className="stopwatch-time" style={{ fontSize: '3rem', marginBottom: '0' }}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="stopwatch-buttons">
          {!running ? (
            <button onClick={handleStart} className="form-btn" style={{ background: sessionColor, minWidth: '100px' }}>
              {timeLeft < getDurationForSession(sessionType) ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button onClick={handlePause} className="form-btn" style={{ background: '#dc2626', minWidth: '100px' }}>
              Pause
            </button>
          )}
          <button onClick={handleReset} className="form-btn secondary">
            Reset
          </button>
          <button onClick={handleSkip} className="form-btn secondary">
            Skip
          </button>
        </div>
      </div>

      {/* Completed Pomodoros Display */}
      <div className="primary-result" style={{ background: sessionBg }}>
        <span className="age-number">{completedPomodoros}</span>
        <span className="age-label">{completedPomodoros === 1 ? 'Pomodoro' : 'Pomodoros'} Completed</span>
      </div>

      {/* Session Progress Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            border: '2px solid ' + (i < workSessionsBeforeLong ? '#4f46e5' : '#e2e8f0'),
            background: i < workSessionsBeforeLong ? '#4f46e5' : 'transparent',
            transition: 'all 0.3s',
          }} title={`Work session ${i + 1} of 4`} />
        ))}
        <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center', marginLeft: '0.25rem' }}>
          {workSessionsBeforeLong}/4 until long break
        </span>
      </div>

      {/* Settings */}
      <div className="calc-section">
        <h2>Timer Settings</h2>
        <div className="form" style={{ marginBottom: 0 }}>
          <div className="input-row">
            <div className="input-group">
              <label>Work (min)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={workDuration}
                onChange={(e) => handleDurationChange('work', e.target.value)}
                disabled={running}
              />
            </div>
            <div className="input-group">
              <label>Short Break (min)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={shortBreakDuration}
                onChange={(e) => handleDurationChange('shortBreak', e.target.value)}
                disabled={running}
              />
            </div>
            <div className="input-group">
              <label>Long Break (min)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={longBreakDuration}
                onChange={(e) => handleDurationChange('longBreak', e.target.value)}
                disabled={running}
              />
            </div>
          </div>
          <button onClick={handleFullReset} className="form-btn secondary" style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>
            Reset All
          </button>
        </div>
      </div>

      <RelatedTools current="/pomodoro-timer" />

      <div className="info-section">
        <h2>How to Use the Pomodoro Timer</h2>
        <p>Getting started is simple. The timer defaults to a 25-minute work session, which is the classic Pomodoro interval. Press "Start" to begin your focused work period. A circular progress ring fills as time passes, giving you a visual sense of how much is left. When the session ends, an audio alert plays and the timer automatically switches to a short break (5 minutes by default). After every four work sessions, you earn a longer break of 15 minutes. Use the "Skip" button to jump to the next session early, "Reset" to restart the current session, or "Reset All" to clear everything and begin a fresh cycle.</p>
        <p>You can customize all three durations in the Timer Settings section at the bottom. For example, some people prefer 50-minute work blocks with 10-minute breaks. The session-progress dots show how many work intervals you have completed toward the next long break, and the completed Pomodoros counter tracks your total output for the day.</p>

        <h2>What Is the Pomodoro Technique?</h2>
        <p>The Pomodoro Technique is a time management method created by Francesco Cirillo in the late 1980s. The name comes from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student. The method structures work into focused intervals (traditionally 25 minutes) separated by short breaks, creating a rhythm that helps sustain concentration. After four consecutive work intervals, a longer break provides deeper recovery. Research in cognitive psychology supports the idea that periodic rest improves sustained attention and reduces the mental fatigue that leads to procrastination.</p>

        <h2>How the Timer Works Behind the Scenes</h2>
        <p>When you press "Start," the timer records an end-time timestamp and checks the remaining seconds four times per second. This timestamp-based approach means the countdown stays accurate even if your browser briefly throttles the interval -- it always compares against real clock time rather than counting ticks. When the remaining time reaches zero, the tool plays a short audio beep sequence using the Web Audio API, advances to the next session type (short break, long break, or work), and pauses so you can begin the next phase when you are ready.</p>

        <h3>Can I change the work and break durations?</h3>
        <p>Yes. Scroll to the "Timer Settings" section below the timer to adjust the work duration (1 to 120 minutes), short break duration, and long break duration. Changes take effect immediately when the timer is paused. For deep-focus tasks like writing or programming, many users prefer 45- or 50-minute work blocks paired with 10-minute breaks. For lighter tasks or study sessions, the classic 25/5 split works well.</p>

        <h3>What happens after four work sessions?</h3>
        <p>The Pomodoro Technique recommends a longer break after every four work intervals. This timer tracks your progress with visual dots -- once all four are filled, the next break is automatically set to the long break duration (15 minutes by default). After the long break, the cycle resets and you start a new set of four. This pattern prevents the gradual decline in focus that occurs when people try to power through hours of uninterrupted work.</p>

        <h3>Will the timer alert me when a session ends?</h3>
        <p>Yes. The timer plays an audio notification using your browser's Web Audio API when each session completes. You will hear a sequence of short beeps to get your attention. Make sure your device volume is turned up and that your browser allows audio playback. The timer also visually indicates the transition by changing the session type label and resetting the progress ring, so you will notice even if your sound is off.</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
