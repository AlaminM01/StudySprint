import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export const AppLayout = ({
  children,
  activeTab,
  onTabChange,
  currentStreak = 5,
  isTimerRunning = false,
  timerTimeLeft = '25:00',
  pendingTasksCount = 0,
  onOpenNewTask,
  weeklyHours = 14.5,
  soundMuted = false,
  onToggleMute,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        pendingTasksCount={pendingTasksCount}
        isTimerRunning={isTimerRunning}
        currentStreak={currentStreak}
        weeklyHours={weeklyHours}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 relative z-10">
        <Header
          activeTab={activeTab}
          currentStreak={currentStreak}
          isTimerRunning={isTimerRunning}
          timerTimeLeft={timerTimeLeft}
          onOpenNewTask={onOpenNewTask}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onNavigate={onTabChange}
          soundMuted={soundMuted}
          onToggleMute={onToggleMute}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation & Drawer */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        isMenuOpen={isMobileMenuOpen}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
        pendingTasksCount={pendingTasksCount}
        currentStreak={currentStreak}
      />
    </div>
  );
};

export default AppLayout;
