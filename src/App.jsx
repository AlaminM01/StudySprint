import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { StudySprintProvider, useStudySprint } from './context/StudySprintContext';
import AppLayout from './components/layout/AppLayout';
import DashboardView from './components/dashboard/DashboardView';
import TimerView from './components/timer/TimerView';
import TasksView from './components/tasks/TasksView';
import StreakView from './components/streak/StreakView';
import AnalyticsView from './components/analytics/AnalyticsView';
import QuotesView from './components/quotes/QuotesView';
import TaskModal from './components/tasks/TaskModal';
import AnimatedPage from './components/common/AnimatedPage';
import useTimer from './hooks/useTimer';
import { triggerConfetti, triggerMilestoneCelebration } from './utils/confetti';
import { MOTIVATIONAL_QUOTES } from './data/quotes';

function MainApplication() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const dailyQuote = MOTIVATIONAL_QUOTES[0];

  const {
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
    toggleSoundMute,
  } = useStudySprint();

  // Timer hook integration
  const timer = useTimer({
    onSessionComplete: (sessionData) => {
      recordCompletedSession(sessionData);
      triggerConfetti();
    },
  });

  const handleToggleTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      triggerConfetti();
    }
    toggleTask(taskId);
  };

  const handleStartFocusOnTask = (task) => {
    timer.setActiveTask(task);
    timer.switchMode('work');
    timer.start();
    setActiveTab('timer');
  };

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      currentStreak={streakData.currentStreak}
      isTimerRunning={timer.isRunning}
      timerTimeLeft={timer.timeLeft ? `${Math.floor(timer.timeLeft / 60)}:${(timer.timeLeft % 60).toString().padStart(2, '0')}` : '25:00'}
      pendingTasksCount={pendingTasksCount}
      onOpenNewTask={() => setIsTaskModalOpen(true)}
      weeklyHours={weeklyTrends.weeklyFocusHours || 14.5}
      soundMuted={isSoundMuted}
      onToggleMute={toggleSoundMute}
    >
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <AnimatedPage key="dashboard">
            <DashboardView
              todayFocusMinutes={todayFocusMinutes}
              dailyGoalMinutes={120}
              currentStreak={streakData.currentStreak}
              longestStreak={streakData.longestStreak}
              completedTasksCount={completedTasksToday}
              totalTodayTasksCount={totalTasksCount}
              productivityScore={productivityScore}
              tasks={tasks}
              activities={recentActivities}
              timerTimeLeft={timer.timeLeft}
              timerMode={timer.mode}
              isTimerRunning={timer.isRunning}
              onStartTimer={timer.start}
              onPauseTimer={timer.pause}
              onResetTimer={timer.reset}
              onSwitchTimerMode={timer.switchMode}
              onToggleTask={handleToggleTask}
              onOpenNewTask={() => setIsTaskModalOpen(true)}
              onNavigate={setActiveTab}
              dailyQuote={dailyQuote}
            />
          </AnimatedPage>
        )}

        {activeTab === 'timer' && (
          <AnimatedPage key="timer">
            <TimerView
              mode={timer.mode}
              timeLeft={timer.timeLeft}
              totalTime={timer.totalTime}
              progressPercent={timer.progressPercent}
              isRunning={timer.isRunning}
              completedSessions={timer.completedSessions}
              settings={timer.settings}
              onStart={timer.start}
              onPause={timer.pause}
              onReset={timer.reset}
              onSkip={timer.skip}
              onSwitchMode={timer.switchMode}
              onUpdateSettings={timer.updateSettings}
              activeTask={timer.activeTask}
              onSelectTask={timer.setActiveTask}
              tasks={tasks}
              todayFocusMinutes={todayFocusMinutes}
              dailyGoalMinutes={120}
              recentSessions={recentActivities.filter((a) => a.type === 'session_completed')}
              isMuted={isSoundMuted}
            />
          </AnimatedPage>
        )}

        {activeTab === 'tasks' && (
          <AnimatedPage key="tasks">
            <TasksView
              tasks={tasks}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleComplete={handleToggleTask}
              onStartFocus={handleStartFocusOnTask}
              onIncrementPomo={incrementPomo}
              isTaskModalOpen={isTaskModalOpen}
              setIsTaskModalOpen={setIsTaskModalOpen}
            />
          </AnimatedPage>
        )}

        {activeTab === 'streak' && (
          <AnimatedPage key="streak">
            <StreakView
              currentStreak={streakData.currentStreak}
              longestStreak={streakData.longestStreak}
              totalStudyDays={streakData.totalStudyDays}
              totalFocusMinutes={streakData.totalFocusMinutes}
              dailyLogs={dailyLogs}
              badges={badges}
            />
          </AnimatedPage>
        )}

        {activeTab === 'analytics' && (
          <AnimatedPage key="analytics">
            <AnalyticsView
              dailyLogs={dailyLogs}
              subjectData={subjectAnalytics}
              weeklyTrends={weeklyTrends}
              todayFocusMinutes={todayFocusMinutes}
              completedTasks={completedTasksToday}
              totalTasks={totalTasksCount}
              currentStreak={streakData.currentStreak}
              productivityScore={productivityScore}
            />
          </AnimatedPage>
        )}

        {activeTab === 'quotes' && (
          <AnimatedPage key="quotes">
            <QuotesView />
          </AnimatedPage>
        )}
      </AnimatePresence>

      {/* Global Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={addTask}
      />
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StudySprintProvider>
        <MainApplication />
      </StudySprintProvider>
    </ThemeProvider>
  );
}
