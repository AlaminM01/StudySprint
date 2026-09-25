import React from 'react';
import { Clock, CheckCircle2, Flame, Calendar, Award } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import { formatMinutesToHours, formatRelativeTime } from '../../utils/formatters';
import { SUBJECTS } from '../../data/subjects';

export const FocusStatisticsCard = ({
  completedSessions = 3,
  todayFocusMinutes = 75,
  dailyGoalMinutes = 120,
  recentSessions = [],
}) => {
  const getSubject = (subjectId) => SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];

  return (
    <Card className="p-6">
      <CardHeader
        title="Focus Session Analytics"
        subtitle="Live tracking of your deep work bursts"
        icon={Clock}
      />

      {/* Mini Stats 3-column Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
          <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Total Sprints
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
            {completedSessions}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Focused Time
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
            {formatMinutesToHours(todayFocusMinutes)}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
          <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Target Pace
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5 block">
            {Math.round((todayFocusMinutes / dailyGoalMinutes) * 100)}%
          </span>
        </div>
      </div>

      {/* Recent Sessions list */}
      <div>
        <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          Today's Completed Pomodoros
        </h5>

        {recentSessions.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            No completed sessions recorded yet. Start the timer to log your first sprint!
          </p>
        ) : (
          <div className="space-y-2">
            {recentSessions.slice(0, 4).map((s, idx) => {
              const subject = getSubject(s.subjectId);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {s.taskTitle || `${subject.name} Sprint`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      +{s.durationMinutes}m
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {formatRelativeTime(s.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

export default FocusStatisticsCard;
