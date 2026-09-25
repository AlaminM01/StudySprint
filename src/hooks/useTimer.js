import { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_TIMER_SETTINGS } from '../data/initialData';

export const useTimer = ({ onSessionComplete } = {}) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('studysprint_timer_settings');
      return saved ? JSON.parse(saved) : INITIAL_TIMER_SETTINGS;
    } catch {
      return INITIAL_TIMER_SETTINGS;
    }
  });

  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [activeTask, setActiveTask] = useState(null);

  // Time remaining in seconds
  const getDurationForMode = useCallback(
    (m, customSettings = settings) => {
      switch (m) {
        case 'work':
          return (customSettings.workDuration || 25) * 60;
        case 'shortBreak':
          return (customSettings.shortBreakDuration || 5) * 60;
        case 'longBreak':
          return (customSettings.longBreakDuration || 15) * 60;
        default:
          return 25 * 60;
      }
    },
    [settings]
  );

  const [timeLeft, setTimeLeft] = useState(() => getDurationForMode('work'));

  const totalTime = getDurationForMode(mode);
  const progressPercent = Math.min(100, Math.max(0, ((totalTime - timeLeft) / totalTime) * 100));

  const timerRef = useRef(null);

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studysprint_timer_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save timer settings', e);
    }
  }, [settings]);

  // Main countdown tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, settings, completedSessions, activeTask]);

  const handleTimerComplete = () => {
    setIsRunning(false);

    const completedSessionData = {
      mode,
      durationMinutes: Math.round(totalTime / 60),
      timestamp: new Date().toISOString(),
      taskId: activeTask ? activeTask.id : null,
      taskTitle: activeTask ? activeTask.title : null,
      subjectId: activeTask ? activeTask.subjectId : 'cs',
    };

    if (onSessionComplete) {
      onSessionComplete(completedSessionData);
    }

    // Determine next mode
    if (mode === 'work') {
      const nextCount = completedSessions + 1;
      setCompletedSessions(nextCount);
      const isLongBreak = nextCount % (settings.longBreakInterval || 4) === 0;
      const nextMode = isLongBreak ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(getDurationForMode(nextMode));
      if (settings.autoStartBreaks) {
        setIsRunning(true);
      }
    } else {
      // Break completed, back to work
      setMode('work');
      setTimeLeft(getDurationForMode('work'));
      if (settings.autoStartPomodoros) {
        setIsRunning(true);
      }
    }
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(getDurationForMode(mode));
  };

  const skip = () => {
    setIsRunning(false);
    if (mode === 'work') {
      const nextCount = completedSessions + 1;
      setCompletedSessions(nextCount);
      const nextMode = nextCount % (settings.longBreakInterval || 4) === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(getDurationForMode(nextMode));
    } else {
      setMode('work');
      setTimeLeft(getDurationForMode('work'));
    }
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getDurationForMode(newMode));
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    // If paused, refresh timeLeft for current mode
    if (!isRunning) {
      setTimeLeft(getDurationForMode(mode, newSettings));
    }
  };

  return {
    mode,
    timeLeft,
    totalTime,
    progressPercent,
    isRunning,
    completedSessions,
    activeTask,
    settings,
    start,
    pause,
    reset,
    skip,
    switchMode,
    setActiveTask,
    updateSettings,
  };
};

export default useTimer;
