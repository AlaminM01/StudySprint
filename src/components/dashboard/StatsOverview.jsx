import React from 'react';
import { Clock, Flame, CheckCircle2, Zap, TrendingUp, Award } from 'lucide-react';
import Card from '../common/Card';
import { formatMinutesToHours } from '../../utils/formatters';

export const StatsOverview = ({
  todayFocusMinutes = 75,
  dailyGoalMinutes = 120,
  currentStreak = 5,
  longestStreak = 12,
  completedTasksCount = 2,
  totalTodayTasksCount = 4,
  productivityScore = 88,
  onNavigate,
}) => {
  const focusGoalPercent = Math.min(100, Math.round((todayFocusMinutes / dailyGoalMinutes) * 100));
  const tasksPercent = totalTodayTasksCount > 0
    ? Math.round((completedTasksCount / totalTodayTasksCount) * 100)
    : 100;

  const statCards = [
    {
      id: 'focus',
      label: "Today's Focus Time",
      value: formatMinutesToHours(todayFocusMinutes),
      subValue: `Goal: ${formatMinutesToHours(dailyGoalMinutes)}`,
      progress: focusGoalPercent,
      icon: Clock,
      gradient: 'from-blue-500 to-indigo-600',
      lightBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      tab: 'timer',
    },
    {
      id: 'streak',
      label: 'Current Streak',
      value: `${currentStreak} Days`,
      subValue: `Best: ${longestStreak} days`,
      progress: Math.min(100, Math.round((currentStreak / longestStreak) * 100)),
      icon: Flame,
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      tab: 'streak',
      isFlame: true,
    },
    {
      id: 'tasks',
      label: 'Tasks Completed',
      value: `${completedTasksCount}/${totalTodayTasksCount}`,
      subValue: `${tasksPercent}% daily completion`,
      progress: tasksPercent,
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      tab: 'tasks',
    },
    {
      id: 'score',
      label: 'Productivity Score',
      value: `${productivityScore}`,
      subValue: productivityScore >= 80 ? 'Peak Flow State' : productivityScore >= 60 ? 'Optimal Sprint' : 'Warming Up',
      progress: productivityScore,
      icon: Zap,
      gradient: 'from-purple-500 to-pink-600',
      lightBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      tab: 'analytics',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.id}
            hoverEffect
            glow
            className="cursor-pointer group select-none transition-all duration-300"
            onClick={() => onNavigate && onNavigate(stat.tab)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              <div
                className={`p-2.5 rounded-xl ${stat.lightBg} transition-transform group-hover:scale-110`}
              >
                <Icon className={`w-4 h-4 ${stat.isFlame ? 'animate-flame' : ''}`} />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {stat.subValue}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-3.5 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-700`}
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsOverview;
