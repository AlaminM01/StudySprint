import React from 'react';
import Card, { CardHeader } from '../common/Card';
import { Zap, TrendingUp, Target, Award, Sparkles } from 'lucide-react';

export const ProductivityScoreCard = ({
  score = 88,
  focusMinutes = 75,
  completedTasks = 2,
  totalTasks = 4,
  currentStreak = 5,
}) => {
  const getScoreStatus = (s) => {
    if (s >= 85) return { label: 'Peak Flow State', color: 'text-emerald-500', desc: 'Outstanding focus rhythm and high task completion velocity.' };
    if (s >= 70) return { label: 'Optimal Sprint', color: 'text-indigo-500', desc: 'Strong momentum. Maintaining consistent Pomodoro blocks.' };
    if (s >= 50) return { label: 'Steady Progress', color: 'text-amber-500', desc: 'Solid foundation. Complete 1 more task to reach optimal.' };
    return { label: 'Warming Up', color: 'text-slate-400', desc: 'Start a 25-minute Pomodoro session to kickstart momentum.' };
  };

  const status = getScoreStatus(score);

  // SVG Gauge calculations
  const radius = 64;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card glow className="p-6">
      <CardHeader
        title="Productivity Flow Score"
        subtitle="Holistic algorithm factoring focus, tasks, and streaks"
        icon={Zap}
      />

      <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
        {/* Radial gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-36 h-36 -rotate-90 transform">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-slate-100 dark:text-slate-800 fill-none"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="url(#scoreGrad)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="fill-none transition-all duration-1000"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {score}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              / 100
            </span>
          </div>
        </div>

        {/* Status text & breakdown */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{status.label}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {status.desc}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Focus Pts</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {Math.min(40, Math.round((focusMinutes / 120) * 40))} / 40
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Tasks Pts</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 35) : 35} / 35
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Streak Pts</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {Math.min(20, currentStreak * 3)} / 20
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductivityScoreCard;
