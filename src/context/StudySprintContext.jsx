import React, { createContext, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  INITIAL_TASKS,
  INITIAL_STREAK,
  INITIAL_RECENT_ACTIVITIES,
  generateInitialDailyLogs,
} from '../data/initialData';
import { BADGES } from '../data/badges';
import { calculateStreak, evaluateBadges } from '../utils/streakCalculator';
import { calculateProductivityScore, getSubjectAnalytics, getWeeklyTrends } from '../utils/productivityCalculator';
import soundEngine from '../utils/soundSynth';

const StudySprintContext = createContext();

export const StudySprintProvider = ({ children, onBadgeUnlock }) => {
  // Local storage state hooks
  const [tasks, setTasks] = useLocalStorage('studysprint_tasks', INITIAL_TASKS);
  const [dailyLogs, setDailyLogs] = useLocalStorage('studysprint_daily_logs', generateInitialDailyLogs());
  const [streakData, setStreakData] = useLocalStorage('studysprint_streak', INITIAL_STREAK);
  const [badges, setBadges] = useLocalStorage('studysprint_badges', BADGES);
  const [recentActivities, setRecentActivities] = useLocalStorage('studysprint_activities', INITIAL_RECENT_ACTIVITIES);
  const [isSoundMuted, setIsSoundMuted] = useLocalStorage('studysprint_muted', false);

  // Sync sound engine mute status
  useEffect(() => {
    soundEngine.setMuted(isSoundMuted);
  }, [isSoundMuted]);

  // Today's log metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = useMemo(() => {
    return dailyLogs.find((l) => l.date === todayStr) || {
      date: todayStr,
      minutes: 0,
      tasksCompleted: 0,
      sessionsCompleted: 0,
      score: 50,
    };
  }, [dailyLogs, todayStr]);

  const todayFocusMinutes = todayLog.minutes;
  const completedTasksToday = tasks.filter((t) => t.completed && t.completedAt && t.completedAt.startsWith(todayStr)).length;
  const totalTasksCount = tasks.length;

  // Productivity score
  const productivityScore = useMemo(() => {
    return calculateProductivityScore({
      todayFocusMinutes,
      dailyGoalMinutes: 120,
      completedTasks: completedTasksToday,
      totalTasks: totalTasksCount,
      currentStreak: streakData.currentStreak,
    });
  }, [todayFocusMinutes, completedTasksToday, totalTasksCount, streakData.currentStreak]);

  // Subject analytics
  const subjectAnalytics = useMemo(() => {
    return getSubjectAnalytics(tasks, dailyLogs);
  }, [tasks, dailyLogs]);

  // Weekly trends
  const weeklyTrends = useMemo(() => {
    return getWeeklyTrends(dailyLogs);
  }, [dailyLogs]);

  // Task Actions
  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    soundEngine.playTick();
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    soundEngine.playTick();
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    soundEngine.playTick();
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          const completedAt = nextCompleted ? new Date().toISOString() : null;

          // If completing, log activity and sound
          if (nextCompleted) {
            soundEngine.playCompletionChime();
            setRecentActivities((acts) => [
              {
                id: `act-${Date.now()}`,
                type: 'task_completed',
                title: `Completed task: "${t.title}"`,
                subjectId: t.subjectId,
                timestamp: new Date().toISOString(),
              },
              ...acts.slice(0, 19),
            ]);

            // Update daily logs tasksCompleted count
            setDailyLogs((logs) =>
              logs.map((log) =>
                log.date === todayStr
                  ? { ...log, tasksCompleted: (log.tasksCompleted || 0) + 1 }
                  : log
              )
            );
          } else {
            soundEngine.playTick();
          }

          return { ...t, completed: nextCompleted, completedAt };
        }
        return t;
      })
    );
  };

  const incrementPomo = (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, completedPomodoros: (t.completedPomodoros || 0) + 1 }
          : t
      )
    );
  };

  // Record completed Pomodoro session
  const recordCompletedSession = (session) => {
    const duration = session.durationMinutes || 25;

    // 1. Play chime
    soundEngine.playCompletionChime();

    // 2. Update daily log
    setDailyLogs((prevLogs) => {
      const existingToday = prevLogs.find((l) => l.date === todayStr);
      if (existingToday) {
        return prevLogs.map((l) =>
          l.date === todayStr
            ? {
                ...l,
                minutes: l.minutes + duration,
                hours: +((l.minutes + duration) / 60).toFixed(1),
                sessionsCompleted: (l.sessionsCompleted || 0) + 1,
              }
            : l
        );
      } else {
        const todayDate = new Date();
        return [
          ...prevLogs,
          {
            date: todayStr,
            displayDate: todayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            day: todayDate.toLocaleDateString('en-US', { weekday: 'short' }),
            minutes: duration,
            hours: +(duration / 60).toFixed(1),
            tasksCompleted: 0,
            sessionsCompleted: 1,
            score: 70,
          },
        ];
      }
    });

    // 3. Update task pomodoro count if linked
    if (session.taskId) {
      incrementPomo(session.taskId);
    }

    // 4. Update streak
    const nextStreak = calculateStreak(dailyLogs);
    setStreakData((prev) => ({
      ...prev,
      currentStreak: Math.max(prev.currentStreak, nextStreak.currentStreak),
      longestStreak: Math.max(prev.longestStreak, nextStreak.longestStreak),
      lastStudyDate: todayStr,
      totalFocusMinutes: prev.totalFocusMinutes + duration,
      totalSessions: prev.totalSessions + 1,
    }));

    // 5. Check badges
    const updatedBadges = evaluateBadges({
      totalFocusMinutes: streakData.totalFocusMinutes + duration,
      totalTasksCompleted: completedTasksToday,
      currentStreak: streakData.currentStreak,
      totalSessions: streakData.totalSessions + 1,
      distinctSubjectsStudied: 4,
      currentBadges: badges,
    });
    setBadges(updatedBadges);

    // 6. Log recent activity
    setRecentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'session_completed',
        title: session.taskTitle
          ? `Finished Pomodoro: "${session.taskTitle}"`
          : 'Completed 25m Focus Sprint',
        subjectId: session.subjectId || 'cs',
        timestamp: new Date().toISOString(),
        durationMinutes: duration,
      },
      ...prev.slice(0, 19),
    ]);
  };

  // Reset to initial demo data
  const resetToDemoData = () => {
    setTasks(INITIAL_TASKS);
    setDailyLogs(generateInitialDailyLogs());
    setStreakData(INITIAL_STREAK);
    setBadges(BADGES);
    setRecentActivities(INITIAL_RECENT_ACTIVITIES);
    soundEngine.playCompletionChime();
  };

  // Export JSON backup
  const exportData = () => {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      tasks,
      dailyLogs,
      streakData,
      badges,
      recentActivities,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studysprint-backup-${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importData = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.tasks) setTasks(data.tasks);
      if (data.dailyLogs) setDailyLogs(data.dailyLogs);
      if (data.streakData) setStreakData(data.streakData);
      if (data.badges) setBadges(data.badges);
      if (data.recentActivities) setRecentActivities(data.recentActivities);
      soundEngine.playCompletionChime();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const toggleSoundMute = () => {
    setIsSoundMuted((prev) => !prev);
  };

  return (
    <StudySprintContext.Provider
      value={{
        tasks,
        dailyLogs,
        streakData,
        badges,
        recentActivities,
        todayFocusMinutes,
        completedTasksToday,
        totalTasksCount,
        productivityScore,
        subjectAnalytics,
        weeklyTrends,
        isSoundMuted,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        incrementPomo,
        recordCompletedSession,
        resetToDemoData,
        exportData,
        importData,
        toggleSoundMute,
      }}
    >
      {children}
    </StudySprintContext.Provider>
  );
};

export const useStudySprint = () => {
  const context = useContext(StudySprintContext);
  if (!context) {
    throw new Error('useStudySprint must be used within a StudySprintProvider');
  }
  return context;
};

export default StudySprintContext;
