import React from 'react';
import { Flame, Sun, Moon, Plus, Bell, Volume2, VolumeX, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

export const Header = ({
  activeTab,
  currentStreak = 5,
  isTimerRunning = false,
  timerTimeLeft = '25:00',
  onOpenNewTask,
  onToggleMobileMenu,
  onNavigate,
  soundMuted = false,
  onToggleMute,
}) => {
  const { theme, toggleTheme } = useTheme();

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Welcome back, Scholar! Ready for your sprint?' };
      case 'tasks':
        return { title: 'Task Manager', subtitle: 'Organize your subjects, track milestones, and conquer deadlines' };
      case 'timer':
        return { title: 'Focus Sprint', subtitle: 'Deep work powered by the Pomodoro technique' };
      case 'streak':
        return { title: 'Streaks & Achievements', subtitle: 'Consistency is your superpower. Keep the flame alive.' };
      case 'analytics':
        return { title: 'Progress Analytics', subtitle: 'Visualize study hours, task velocity, and subject mastery' };
      case 'quotes':
        return { title: 'Daily Inspiration', subtitle: 'Curated wisdom for students and high performers' };
      default:
        return { title: 'StudySprint', subtitle: 'Student Productivity Platform' };
    }
  };

  const headerInfo = getSectionTitle();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {headerInfo.title}
            </h1>
            <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
              {headerInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Timer Pill (if running or on different tab) */}
          {isTimerRunning && (
            <button
              onClick={() => onNavigate('timer')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold animate-pulse hover:bg-indigo-500/20 transition-all cursor-pointer"
              title="Click to view Focus Timer"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>{timerTimeLeft}</span>
              <span className="hidden sm:inline text-indigo-400 dark:text-indigo-300">Focusing</span>
            </button>
          )}

          {/* Streak Flame Badge */}
          <button
            onClick={() => onNavigate('streak')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 hover:scale-105 transition-transform cursor-pointer"
            title={`${currentStreak} Day Study Streak! Keep it going!`}
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-flame" />
            <span className="text-xs font-bold">{currentStreak}</span>
            <span className="hidden sm:inline text-[11px] font-medium text-slate-500 dark:text-slate-400">days</span>
          </button>

          {/* Audio toggle */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={soundMuted ? 'Unmute audio effects' : 'Mute audio effects'}
              aria-label="Sound settings"
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-500" />}
            </button>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300" />
            )}
          </button>

          {/* Quick Add Task Button */}
          {onOpenNewTask && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={onOpenNewTask}
              className="hidden sm:inline-flex shadow-sm shadow-indigo-500/20"
            >
              New Task
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
