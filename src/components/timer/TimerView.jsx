import React from 'react';
import PomodoroTimer from './PomodoroTimer';
import AmbientSoundPlayer from './AmbientSoundPlayer';
import FocusStatisticsCard from './FocusStatisticsCard';

export const TimerView = ({
  mode,
  timeLeft,
  totalTime,
  progressPercent,
  isRunning,
  completedSessions,
  settings,
  onStart,
  onPause,
  onReset,
  onSkip,
  onSwitchMode,
  onUpdateSettings,
  activeTask,
  onSelectTask,
  tasks,
  todayFocusMinutes,
  dailyGoalMinutes,
  recentSessions,
  isMuted,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Focus Sprint Station
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Eliminate digital distractions, maintain single-task focus, and supercharge retention
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main circular timer dial (7 cols) */}
        <div className="lg:col-span-7">
          <PomodoroTimer
            mode={mode}
            timeLeft={timeLeft}
            totalTime={totalTime}
            progressPercent={progressPercent}
            isRunning={isRunning}
            completedSessions={completedSessions}
            settings={settings}
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onSkip={onSkip}
            onSwitchMode={onSwitchMode}
            onUpdateSettings={onUpdateSettings}
            activeTask={activeTask}
            onSelectTask={onSelectTask}
            tasks={tasks}
          />
        </div>

        {/* Ambient audio & Session analytics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <AmbientSoundPlayer isMuted={isMuted} />

          <FocusStatisticsCard
            completedSessions={completedSessions}
            todayFocusMinutes={todayFocusMinutes}
            dailyGoalMinutes={dailyGoalMinutes}
            recentSessions={recentSessions}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerView;
