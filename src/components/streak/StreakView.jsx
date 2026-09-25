import React from 'react';
import { Flame, Trophy, Calendar, Award, Zap, Star } from 'lucide-react';
import Card from '../common/Card';
import StreakCalendar from './StreakCalendar';
import BadgesGrid from './BadgesGrid';
import { formatMinutesToHours } from '../../utils/formatters';

export const StreakView = ({
  currentStreak = 5,
  longestStreak = 12,
  totalStudyDays = 28,
  totalFocusMinutes = 1845,
  dailyLogs = [],
  badges = [],
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Streak Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white p-6 sm:p-8 shadow-xl shadow-orange-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/30 shrink-0">
              <Flame className="w-12 h-12 fill-white animate-flame" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                <span>Streak Protected • Keep It Burning</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                {currentStreak} Day Study Streak!
              </h2>
              <p className="text-sm sm:text-base text-orange-100 mt-1 max-w-lg">
                Consistency compounds. You've studied for {formatMinutesToHours(totalFocusMinutes)} across {totalStudyDays} days.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <span className="text-xs uppercase font-bold text-orange-200 block">
                Longest Streak
              </span>
              <span className="text-2xl font-black mt-1 block">
                {longestStreak} Days
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <span className="text-xs uppercase font-bold text-orange-200 block">
                Total Focus
              </span>
              <span className="text-2xl font-black mt-1 block">
                {Math.round(totalFocusMinutes / 60)}h
              </span>
            </div>
          </div>
        </div>

        {/* Ambient background glow inside hero */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Heatmap Section */}
      <StreakCalendar dailyLogs={dailyLogs} />

      {/* Badges Grid Section */}
      <BadgesGrid badges={badges} />
    </div>
  );
};

export default StreakView;
