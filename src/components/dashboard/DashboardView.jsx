import React from 'react';
import { Sparkles, Play, Plus, BookOpen, Flame, ArrowUpRight } from 'lucide-react';
import StatsOverview from './StatsOverview';
import QuickFocusCard from './QuickFocusCard';
import TodayTasksCard from './TodayTasksCard';
import DailyStreakCard from './DailyStreakCard';
import RecentActivity from './RecentActivity';
import Button from '../common/Button';

export const DashboardView = ({
  todayFocusMinutes = 75,
  dailyGoalMinutes = 120,
  currentStreak = 5,
  longestStreak = 12,
  completedTasksCount = 2,
  totalTodayTasksCount = 4,
  productivityScore = 88,
  tasks = [],
  activities = [],
  timerTimeLeft = 1500,
  timerMode = 'work',
  isTimerRunning = false,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onSwitchTimerMode,
  onToggleTask,
  onOpenNewTask,
  onNavigate,
  dailyQuote = null,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-500/15">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide text-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sprint Session Active • High Productivity Day</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {getGreeting()}, Scholar!
            </h2>

            {dailyQuote ? (
              <p className="text-sm sm:text-base text-indigo-100/90 italic font-light">
                "{dailyQuote.quote}" — <span className="font-medium text-white">{dailyQuote.author}</span>
              </p>
            ) : (
              <p className="text-sm text-indigo-100/90">
                You're just 45 minutes away from hitting your daily deep work target. Make today count!
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="md"
              icon={isTimerRunning ? null : Play}
              onClick={() => onNavigate('timer')}
              className="bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold shadow-lg"
            >
              {isTimerRunning ? 'Resume Session' : 'Start Focus Sprint'}
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={Plus}
              onClick={onOpenNewTask}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Ambient background spheres inside hero */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 w-60 h-60 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <StatsOverview
        todayFocusMinutes={todayFocusMinutes}
        dailyGoalMinutes={dailyGoalMinutes}
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        completedTasksCount={completedTasksCount}
        totalTodayTasksCount={totalTodayTasksCount}
        productivityScore={productivityScore}
        onNavigate={onNavigate}
      />

      {/* Dashboard 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quick Focus & Tasks (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <QuickFocusCard
            mode={timerMode}
            timeLeft={timerTimeLeft}
            isRunning={isTimerRunning}
            onStart={onStartTimer}
            onPause={onPauseTimer}
            onReset={onResetTimer}
            onSwitchMode={onSwitchTimerMode}
            onOpenFullTimer={() => onNavigate('timer')}
            activeTask={tasks.find((t) => !t.completed)}
          />

          <TodayTasksCard
            tasks={tasks}
            onToggleTask={onToggleTask}
            onOpenNewTask={onOpenNewTask}
            onViewAllTasks={() => onNavigate('tasks')}
          />
        </div>

        {/* Right Column: Streaks & Activity (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <DailyStreakCard
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            onNavigate={onNavigate}
          />

          <RecentActivity
            activities={activities}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
