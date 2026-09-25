import React from 'react';
import {
  LayoutDashboard,
  Timer,
  CheckSquare,
  Flame,
  BarChart3,
  Sparkles,
  Zap,
  GraduationCap,
} from 'lucide-react';


export const Sidebar = ({
  activeTab,
  onTabChange,
  pendingTasksCount = 0,
  isTimerRunning = false,
  currentStreak = 5,
  weeklyHours = 14.5,
  weeklyGoalHours = 20,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'timer',
      label: 'Focus Timer',
      icon: Timer,
      badge: isTimerRunning ? (
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      ) : null,
    },
    {
      id: 'tasks',
      label: 'Task Manager',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          {pendingTasksCount}
        </span>
      ) : null,
    },
    {
      id: 'streak',
      label: 'Streak & Badges',
      icon: Flame,
      badge: (
        <span className="flex items-center gap-1 text-[11px] font-bold text-orange-500">
          {currentStreak}d
        </span>
      ),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'quotes',
      label: 'Inspiration',
      icon: Sparkles,
      badge: null,
    },
  ];

  const goalPercentage = Math.min(100, Math.round((weeklyHours / weeklyGoalHours) * 100));

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-r border-slate-200/80 dark:border-slate-800/80 transition-colors z-40">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                StudySprint
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500 text-white tracking-wider uppercase">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Student Focus Suite
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Main Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer
                ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge}
            </button>
          );
        })}
      </nav>

      {/* Student Progress Card Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:bg-slate-800/40 border border-indigo-500/10 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-indigo-500/20">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                Study Master
              </h4>
              <p className="text-[10px] text-slate-400">
                Level 4 • Deep Learner
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Weekly Sprint Goal</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {weeklyHours}/{weeklyGoalHours}h
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
