import React from 'react';
import { Flame, Trophy, Calendar, Check, ArrowRight } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';

export const DailyStreakCard = ({
  currentStreak = 5,
  longestStreak = 12,
  onNavigate,
}) => {
  // Generate 7 days of the current week (e.g. Mon-Sun)
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Active states for demo week (last 5 days active)
  const activeDays = [true, true, true, true, true, false, false];

  return (
    <Card glow className="relative flex flex-col justify-between overflow-hidden">
      <div>
        <CardHeader
          title="Daily Study Streak"
          subtitle="Consistency fuels academic mastery"
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate && onNavigate('streak')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Badges
            </Button>
          }
        />

        {/* Hero streak banner */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-orange-500/20 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Flame className="w-8 h-8 fill-white animate-flame" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                {currentStreak}
              </span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Day Streak 🔥
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personal record: <span className="font-semibold text-slate-700 dark:text-slate-200">{longestStreak} days</span>. You're on fire!
            </p>
          </div>
        </div>

        {/* Weekly calendar dot track */}
        <div className="flex items-center justify-between gap-1 p-3 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
          {daysOfWeek.map((day, idx) => {
            const isCompleted = activeDays[idx];
            const isToday = idx === 4; // Friday in demo

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">
                  {day}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform ${
                    isCompleted
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm shadow-orange-500/30 scale-105'
                      : isToday
                      ? 'border-2 border-dashed border-orange-400 text-orange-400'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next milestone */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          Next Milestone: 7-Day Titan
        </span>
        <span className="font-bold text-orange-600 dark:text-orange-400">
          2 days left
        </span>
      </div>
    </Card>
  );
};

export default DailyStreakCard;
