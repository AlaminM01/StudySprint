import React from 'react';
import Card, { CardHeader } from '../common/Card';
import { Calendar, Flame, Info } from 'lucide-react';

export const StreakCalendar = ({ dailyLogs = [] }) => {
  // Generate last 35 days (5 weeks) for calendar heatmap
  const totalDays = 35;
  const calendarCells = [];
  const today = new Date();

  // Map daily logs for fast lookup
  const logsMap = {};
  dailyLogs.forEach((log) => {
    logsMap[log.date] = log;
  });

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const log = logsMap[dateStr];
    const minutes = log ? log.minutes : 0;
    const tasks = log ? log.tasksCompleted : 0;

    let intensity = 0;
    if (minutes > 0 && minutes < 60) intensity = 1;
    else if (minutes >= 60 && minutes < 120) intensity = 2;
    else if (minutes >= 120 && minutes < 180) intensity = 3;
    else if (minutes >= 180) intensity = 4;

    calendarCells.push({
      date: dateStr,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      minutes,
      tasks,
      intensity,
      isToday: i === 0,
    });
  }

  const getCellBg = (intensity) => {
    switch (intensity) {
      case 1:
        return 'bg-indigo-300 dark:bg-indigo-950/70 border-indigo-400 dark:border-indigo-800';
      case 2:
        return 'bg-indigo-400 dark:bg-indigo-800/80 border-indigo-500 dark:border-indigo-700';
      case 3:
        return 'bg-indigo-500 dark:bg-indigo-600 border-indigo-600 dark:border-indigo-500';
      case 4:
        return 'bg-indigo-600 dark:bg-indigo-500 border-indigo-700 dark:border-indigo-400';
      default:
        return 'bg-slate-100 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-800';
    }
  };

  return (
    <Card className="p-6">
      <CardHeader
        title="Learning Consistency Heatmap"
        subtitle="35-day study activity matrix and intensity patterns"
        icon={Calendar}
      />

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[450px]">
          {/* Grid of 35 days (5 weeks x 7 days) */}
          <div className="grid grid-cols-7 gap-2.5">
            {calendarCells.map((cell, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ minHeight: '56px' }}
              >
                <div
                  className={`w-full h-full absolute inset-0 rounded-xl ${getCellBg(
                    cell.intensity
                  )} opacity-90 transition-opacity`}
                />

                <div className="relative z-10 text-center">
                  <span
                    className={`text-[10px] font-bold block ${
                      cell.intensity > 1
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cell.displayDate.split(' ')[1]}
                  </span>
                  <span
                    className={`text-[9px] block ${
                      cell.intensity > 1
                        ? 'text-white/80'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {cell.minutes > 0 ? `${cell.minutes}m` : '0m'}
                  </span>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] whitespace-nowrap shadow-xl">
                    <p className="font-bold">{cell.displayDate}</p>
                    <p className="text-slate-300">
                      {cell.minutes} mins • {cell.tasks} tasks done
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Legend row */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span>5-week study log</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800" />
              <div className="w-3 h-3 rounded bg-indigo-300 dark:bg-indigo-950/70" />
              <div className="w-3 h-3 rounded bg-indigo-400 dark:bg-indigo-800" />
              <div className="w-3 h-3 rounded bg-indigo-500 dark:bg-indigo-600" />
              <div className="w-3 h-3 rounded bg-indigo-600 dark:bg-indigo-500" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StreakCalendar;
