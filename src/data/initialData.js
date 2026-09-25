import { BADGES } from './badges';

export const INITIAL_TIMER_SETTINGS = {
  workDuration: 25, // minutes
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundNotification: true,
  ambientSound: 'none', // 'none' | 'rain' | 'whitenoise' | 'binaural' | 'waves'
  volume: 0.7,
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Implement Dijkstra and A* graph pathfinding algorithms',
    subjectId: 'dsa',
    priority: 'urgent',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    estimatedPomodoros: 4,
    completedPomodoros: 3,
    completed: false,
    notes: 'Focus on min-heap optimization and space complexity trade-offs.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-2',
    title: 'Review System Design: Consistent Hashing & Distributed Caching',
    subjectId: 'os',
    priority: 'high',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // in 2 days
    estimatedPomodoros: 3,
    completedPomodoros: 2,
    completed: false,
    notes: 'Cover Redis cluster architecture and cache invalidation patterns.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-3',
    title: 'Complete Problem Set 4 on Markov Chains & Bayes Theorem',
    subjectId: 'math',
    priority: 'medium',
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // in 3 days
    estimatedPomodoros: 3,
    completedPomodoros: 0,
    completed: false,
    notes: 'Prepare transition matrices and stationary distribution proofs.',
    createdAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: 'task-4',
    title: 'Build Responsive React Dashboard with Tailwind CSS & Glassmorphism',
    subjectId: 'web',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0], // today
    estimatedPomodoros: 4,
    completedPomodoros: 4,
    completed: true,
    notes: 'Completed layout, accessible navigation, and theme toggling.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    completedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Read Attention Is All You Need paper (Transformer architecture)',
    subjectId: 'ai',
    priority: 'medium',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    estimatedPomodoros: 2,
    completedPomodoros: 2,
    completed: true,
    notes: 'Diagram multi-head self-attention and positional encodings.',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-6',
    title: 'Operating Systems: Thread synchronization & Mutex vs Semaphore',
    subjectId: 'cs',
    priority: 'low',
    dueDate: new Date(Date.now() + 432000000).toISOString().split('T')[0],
    estimatedPomodoros: 2,
    completedPomodoros: 1,
    completed: false,
    notes: 'Implement reader-writer lock in C/Rust.',
    createdAt: new Date().toISOString(),
    completedAt: null,
  },
];

// 14 days of realistic historical activity for charts
export const generateInitialDailyLogs = () => {
  const days = [];
  const today = new Date();
  
  // Historical data template (minutes, tasksCompleted, sessions)
  const presets = [
    { minutes: 110, tasks: 3, sessions: 4 }, // 13 days ago
    { minutes: 95, tasks: 2, sessions: 4 },
    { minutes: 140, tasks: 4, sessions: 5 },
    { minutes: 75, tasks: 1, sessions: 3 },
    { minutes: 120, tasks: 3, sessions: 5 },
    { minutes: 160, tasks: 5, sessions: 6 },
    { minutes: 50, tasks: 1, sessions: 2 },
    { minutes: 130, tasks: 3, sessions: 5 },
    { minutes: 175, tasks: 4, sessions: 7 },
    { minutes: 125, tasks: 3, sessions: 5 }, // 4 days ago
    { minutes: 150, tasks: 4, sessions: 6 }, // 3 days ago
    { minutes: 100, tasks: 2, sessions: 4 }, // 2 days ago
    { minutes: 125, tasks: 3, sessions: 5 }, // yesterday
    { minutes: 75, tasks: 2, sessions: 3 },  // today so far
  ];

  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const preset = presets[13 - i] || { minutes: 90, tasks: 2, sessions: 3 };

    days.push({
      date: dateStr,
      displayDate: formattedDate,
      day: dayName,
      minutes: preset.minutes,
      hours: +(preset.minutes / 60).toFixed(1),
      tasksCompleted: preset.tasks,
      sessionsCompleted: preset.sessions,
      score: Math.min(100, Math.round((preset.minutes / 120) * 60 + (preset.tasks / 3) * 40)),
    });
  }

  return days;
};

export const INITIAL_STREAK = {
  currentStreak: 5,
  longestStreak: 12,
  lastStudyDate: new Date().toISOString().split('T')[0],
  streakStartDate: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
  totalStudyDays: 28,
  totalFocusMinutes: 1845,
  totalSessions: 74,
};

export const INITIAL_RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'session_completed',
    title: 'Completed Pomodoro: React Glassmorphism Dashboard',
    subjectId: 'web',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    durationMinutes: 25,
  },
  {
    id: 'act-2',
    type: 'task_completed',
    title: 'Marked "Build Responsive React Dashboard" as finished',
    subjectId: 'web',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
  },
  {
    id: 'act-3',
    type: 'badge_unlocked',
    title: 'Unlocked Badge: Deep Work Master (10+ hours)',
    timestamp: new Date(Date.now() - 140 * 60000).toISOString(),
    badgeId: 'hours-10',
  },
  {
    id: 'act-4',
    type: 'session_completed',
    title: 'Completed Pomodoro: Dijkstra Algorithm review',
    subjectId: 'dsa',
    timestamp: new Date(Date.now() - 210 * 60000).toISOString(),
    durationMinutes: 25,
  },
];
