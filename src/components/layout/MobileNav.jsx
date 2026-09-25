import React from 'react';
import {
  LayoutDashboard,
  Timer,
  CheckSquare,
  Flame,
  BarChart3,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

export const MobileNav = ({
  activeTab,
  onTabChange,
  isMenuOpen,
  onCloseMenu,
  pendingTasksCount = 0,
  currentStreak = 5,
}) => {
  const bottomItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'streak', label: 'Streak', icon: Flame, badge: `${currentStreak}d` },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-2 pb-safe flex items-center justify-around shadow-2xl">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative active:scale-95 touch-manipulation cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-115 text-indigo-600 dark:text-indigo-400' : ''} transition-transform`} />
                {item.badge && typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 text-[9px] font-bold rounded-full bg-indigo-600 text-white min-w-4 text-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-6 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Slide-out Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMenu}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full p-6 shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  StudySprint
                </span>
              </div>
              <button
                onClick={onCloseMenu}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'timer', label: 'Pomodoro Focus', icon: Timer },
                { id: 'tasks', label: 'Task Manager', icon: CheckSquare },
                { id: 'streak', label: 'Streaks & Badges', icon: Flame },
                { id: 'analytics', label: 'Progress Analytics', icon: BarChart3 },
                { id: 'quotes', label: 'Inspirational Quotes', icon: Sparkles },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      onCloseMenu();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 text-center">
              StudySprint • v1.0.0
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
