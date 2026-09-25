import React from 'react';
import Card from '../common/Card';
import { Clock, CheckCircle2, TrendingUp, BookOpen } from 'lucide-react';
import { formatMinutesToHours } from '../../utils/formatters';

export const AnalyticsOverviewCards = ({
  weeklyFocusHours = 14.5,
  weeklyTasksCompleted = 19,
  avgDailyMinutes = 124,
  topSubjectName = 'Artificial Intelligence & ML',
}) => {
  const cards = [
    {
      label: 'Weekly Focus Hours',
      value: `${weeklyFocusHours}h`,
      subText: '+2.4h vs last week',
      icon: Clock,
      gradient: 'from-indigo-500 to-purple-600',
      iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      label: 'Tasks Completed',
      value: weeklyTasksCompleted,
      subText: 'Across 5 subjects',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Average Daily Focus',
      value: formatMinutesToHours(avgDailyMinutes),
      subText: 'Target: 2h 00m / day',
      icon: TrendingUp,
      gradient: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Top Focused Domain',
      value: 'AI / ML',
      subText: topSubjectName,
      icon: BookOpen,
      gradient: 'from-pink-500 to-rose-600',
      iconBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Card key={i} hoverEffect className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {c.label}
              </span>
              <div className={`p-2 rounded-xl ${c.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight block">
              {c.value}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block truncate">
              {c.subText}
            </span>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsOverviewCards;
