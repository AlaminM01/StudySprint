import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  Flame,
  CheckCircle2,
  BookOpen,
  Volume2,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import TimerSettingsModal from './TimerSettingsModal';
import { formatSecondsToMMSS } from '../../utils/formatters';
import { SUBJECTS } from '../../data/subjects';

export const PomodoroTimer = ({
  mode = 'work',
  timeLeft = 1500,
  totalTime = 1500,
  progressPercent = 0,
  isRunning = false,
  completedSessions = 3,
  settings,
  onStart,
  onPause,
  onReset,
  onSkip,
  onSwitchMode,
  onUpdateSettings,
  activeTask = null,
  onSelectTask,
  tasks = [],
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);

  // SVG circular progress calculation
  const radius = 135;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const modeColors = {
    work: {
      gradient: 'from-indigo-600 via-indigo-500 to-purple-600',
      strokeGrad: 'url(#workGradient)',
      glow: 'glow-primary',
      accent: 'text-indigo-600 dark:text-indigo-400',
      bgPill: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      title: 'Focus Sprint',
    },
    shortBreak: {
      gradient: 'from-emerald-500 to-teal-600',
      strokeGrad: 'url(#breakGradient)',
      glow: 'glow-emerald',
      accent: 'text-emerald-600 dark:text-emerald-400',
      bgPill: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      title: 'Short Rest',
    },
    longBreak: {
      gradient: 'from-blue-500 to-cyan-600',
      strokeGrad: 'url(#longBreakGradient)',
      glow: 'glow-primary',
      accent: 'text-cyan-600 dark:text-cyan-400',
      bgPill: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      title: 'Long Recharge',
    },
  };

  const currentTheme = modeColors[mode] || modeColors.work;
  const pendingTasks = tasks.filter((t) => !t.completed);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card glow className="p-6 sm:p-10 flex flex-col items-center relative overflow-hidden">
        {/* Top Header Row with Settings & Session Counter */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentTheme.bgPill}`}>
              {currentTheme.title}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Round {(completedSessions % (settings?.longBreakInterval || 4)) + 1} of {settings?.longBreakInterval || 4}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Timer Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1.5 bg-slate-100/80 dark:bg-slate-800/60 rounded-2xl mb-8 max-w-sm w-full border border-slate-200/60 dark:border-slate-800">
          {[
            { id: 'work', label: 'Pomodoro', duration: `${settings?.workDuration || 25}m` },
            { id: 'shortBreak', label: 'Short Break', duration: `${settings?.shortBreakDuration || 5}m` },
            { id: 'longBreak', label: 'Long Break', duration: `${settings?.longBreakDuration || 15}m` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSwitchMode(tab.id)}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                mode === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div>{tab.label}</div>
              <div className="text-[10px] opacity-70 font-normal">{tab.duration}</div>
            </button>
          ))}
        </div>

        {/* Circular Progress Dial */}
        <div className="relative flex items-center justify-center my-2">
          <svg className="w-72 h-72 sm:w-80 sm:h-80 -rotate-90 transform">
            <defs>
              <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="longBreakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>

            {/* Background Track Ring */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-slate-100 dark:text-slate-800/80 fill-none"
            />

            {/* Animated Dynamic Progress Ring */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={currentTheme.strokeGrad}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="fill-none transition-all duration-1000 ease-linear"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Center Digital Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formatSecondsToMMSS(timeLeft)}
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mt-2">
              {isRunning ? 'Session Active' : 'Ready to Sprint'}
            </span>

            {/* Session Dots Indicator */}
            <div className="flex items-center gap-1.5 mt-3">
              {Array.from({ length: settings?.longBreakInterval || 4 }).map((_, i) => {
                const isDone = i < (completedSessions % (settings?.longBreakInterval || 4));
                return (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isDone
                        ? 'bg-indigo-600 dark:bg-indigo-400 scale-110'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Task Selector Pill */}
        <div className="relative mt-4 mb-6 w-full max-w-sm">
          <button
            onClick={() => setIsTaskDropdownOpen(!isTaskDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:border-indigo-500/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="truncate">
                {activeTask ? activeTask.title : 'Select a task to focus on (Optional)'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {isTaskDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 p-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-20 max-h-48 overflow-y-auto space-y-1">
              <button
                onClick={() => {
                  onSelectTask(null);
                  setIsTaskDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                No specific task (General Study)
              </button>
              {pendingTasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTask(t);
                    setIsTaskDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium truncate transition-colors ${
                    activeTask?.id === t.id
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Master Control Buttons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Button
            variant="ghost"
            size="md"
            icon={RotateCcw}
            onClick={onReset}
            title="Reset timer"
            className="text-slate-500"
          >
            Reset
          </Button>

          {isRunning ? (
            <button
              onClick={onPause}
              className="px-8 py-3.5 rounded-2xl font-bold text-base text-white bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-xl transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onStart}
              className={`px-10 py-3.5 rounded-2xl font-bold text-base text-white bg-gradient-to-r ${currentTheme.gradient} shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer`}
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Focus</span>
            </button>
          )}

          <Button
            variant="ghost"
            size="md"
            icon={SkipForward}
            onClick={onSkip}
            title="Skip current interval"
            className="text-slate-500"
          >
            Skip
          </Button>
        </div>
      </Card>

      {/* Settings Modal */}
      <TimerSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={onUpdateSettings}
      />
    </div>
  );
};

export default PomodoroTimer;
