import React from 'react';
import Card, { CardHeader } from '../common/Card';
import {
  Rocket,
  Flame,
  CheckCircle2,
  Hourglass,
  Zap,
  Award,
  Sparkles,
  Moon,
  ShieldCheck,
  Trophy,
  Lock,
} from 'lucide-react';

const ICON_MAP = {
  Rocket,
  Flame,
  CheckCircle2,
  Hourglass,
  Zap,
  Award,
  Sparkles,
  Moon,
  ShieldCheck,
  Trophy,
};

export const BadgesGrid = ({ badges = [] }) => {
  const getTierStyles = (tier, isUnlocked) => {
    if (!isUnlocked) {
      return {
        cardBorder: 'border-slate-200/60 dark:border-slate-800/60 opacity-60',
        badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-400',
        iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-400',
      };
    }

    switch (tier) {
      case 'diamond':
        return {
          cardBorder: 'border-cyan-500/40 shadow-cyan-500/10',
          badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20',
          iconBg: 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/30',
        };
      case 'gold':
        return {
          cardBorder: 'border-amber-500/40 shadow-amber-500/10',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
          iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30',
        };
      case 'silver':
        return {
          cardBorder: 'border-slate-300 dark:border-slate-700 shadow-slate-500/10',
          badgeColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-400/20',
          iconBg: 'bg-gradient-to-tr from-slate-500 to-slate-700 text-white shadow-md',
        };
      case 'bronze':
      default:
        return {
          cardBorder: 'border-orange-500/30 shadow-orange-500/10',
          badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20',
          iconBg: 'bg-gradient-to-tr from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/30',
        };
    }
  };

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <Card className="p-6">
      <CardHeader
        title="Achievement Trophy Case"
        subtitle={`${unlockedCount} of ${badges.length} Badges Unlocked`}
        icon={Trophy}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const Icon = ICON_MAP[badge.icon] || Award;
          const styles = getTierStyles(badge.tier, badge.isUnlocked);
          const progressPercent = Math.min(
            100,
            Math.round((badge.progress / badge.maxProgress) * 100)
          );

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border ${styles.cardBorder} transition-all duration-300 hover:shadow-lg flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
                    {badge.isUnlocked ? (
                      <Icon className="w-6 h-6" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badgeColor}`}>
                    {badge.tier}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {/* Progress or Unlock Date */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {badge.isUnlocked ? (
                  <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked
                    </span>
                    <span className="text-slate-400 font-normal">
                      {badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : 'Achieved'}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">
                      <span>Progress</span>
                      <span>
                        {badge.progress} / {badge.maxProgress}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BadgesGrid;
