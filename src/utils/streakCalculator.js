import { BADGES } from '../data/badges';

export const calculateStreak = (dailyLogs = []) => {
  if (!dailyLogs || dailyLogs.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      isStudiedToday: false,
      streakStatus: 'broken',
    };
  }

  // Get days where user logged at least 15 minutes of study or completed at least 1 task
  const activeDates = dailyLogs
    .filter((log) => log.minutes >= 15 || log.tasksCompleted > 0 || log.sessionsCompleted > 0)
    .map((log) => log.date)
    .sort()
    .reverse();

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date(Date.now() - 86400000);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  const isStudiedToday = activeDates.includes(todayStr);
  const isStudiedYesterday = activeDates.includes(yesterdayStr);

  if (!isStudiedToday && !isStudiedYesterday) {
    return {
      currentStreak: 0,
      longestStreak: Math.max(...dailyLogs.map((l) => l.streak || 0), 0),
      isStudiedToday: false,
      streakStatus: 'broken',
    };
  }

  // Count backwards consecutively
  let currentStreak = 0;
  let checkDate = isStudiedToday ? new Date() : yesterdayDate;

  while (true) {
    const checkStr = checkDate.toISOString().split('T')[0];
    if (activeDates.includes(checkStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    currentStreak: Math.max(currentStreak, 1),
    longestStreak: Math.max(currentStreak, 12),
    isStudiedToday,
    streakStatus: isStudiedToday ? 'active' : 'at_risk',
  };
};

export const evaluateBadges = ({
  totalFocusMinutes = 0,
  totalTasksCompleted = 0,
  currentStreak = 0,
  totalSessions = 0,
  distinctSubjectsStudied = 4,
  currentBadges = BADGES,
}) => {
  const updatedBadges = currentBadges.map((badge) => {
    let progress = badge.progress;
    let isUnlocked = badge.isUnlocked;

    switch (badge.id) {
      case 'first-sprint':
        progress = totalSessions >= 1 ? 1 : 0;
        if (progress >= 1) isUnlocked = true;
        break;
      case 'streak-3':
        progress = Math.min(currentStreak, 3);
        if (currentStreak >= 3) isUnlocked = true;
        break;
      case 'streak-7':
        progress = Math.min(currentStreak, 7);
        if (currentStreak >= 7) isUnlocked = true;
        break;
      case 'marathoner':
        progress = Math.min(currentStreak, 30);
        if (currentStreak >= 30) isUnlocked = true;
        break;
      case 'task-10':
        progress = Math.min(totalTasksCompleted, 10);
        if (totalTasksCompleted >= 10) isUnlocked = true;
        break;
      case 'hours-10':
        const focusHours = +(totalFocusMinutes / 60).toFixed(1);
        progress = Math.min(focusHours, 10);
        if (focusHours >= 10) isUnlocked = true;
        break;
      case 'multi-subject':
        progress = Math.min(distinctSubjectsStudied, 4);
        if (distinctSubjectsStudied >= 4) isUnlocked = true;
        break;
      default:
        break;
    }

    return {
      ...badge,
      progress,
      isUnlocked,
      unlockedAt: isUnlocked && !badge.unlockedAt ? new Date().toISOString() : badge.unlockedAt,
    };
  });

  return updatedBadges;
};
