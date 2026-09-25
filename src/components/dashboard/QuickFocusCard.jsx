import React from 'react';
import { Play, Pause, RotateCcw, Maximize2, Sparkles, BookOpen } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import { formatSecondsToMMSS } from '../../utils/formatters';

export const QuickFocusCard = ({
  mode = 'work', // 'work' | 'shortBreak' | 'longBreak'
  timeLeft = 1500,
  isRunning = false,
  onStart,
  onPause,
  onReset,
  onSwitchMode,
  onOpenFullTimer,
  activeTask = null,
  completedSessions = 3,
}) => {
  const getModeLabel = () => {
    if (mode === 'work') return 'Focus Sprint';
    if (mode === 'shortBreak') return 'Short Rest';
    return 'Long Rest';
  };

  const modeThemes = {
    work: 'from-indigo-600 via-indigo-500 to-purple-600',
    shortBreak: 'from-emerald-500 to-teal-600',
    longBreak: 'from-blue-500 to-cyan-600',
  };

  return (
    <Card glow className="relative flex flex-col justify-between overflow-hidden">
      <CardHeader
        title="Quick Sprint"
        subtitle={activeTask ? `Target: ${activeTask.title}` : 'Jump into deep focus mode'}
        action={
          <Button
            variant="ghost"
            size="sm"
            icon={Maximize2}
            onClick={onOpenFullTimer}
            title="Open Full Focus Station"
          />
        }
      />

      {/* Mode pill selector */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-4 self-center max-w-xs w-full">
        {[
          { key: 'work', label: 'Sprint 25m' },
          { key: 'shortBreak', label: 'Break 5m' },
          { key: 'longBreak', label: 'Rest 15m' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => onSwitchMode(m.key)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === m.key
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Big Digital Countdown */}
      <div className="text-center my-2">
        <div className="inline-block relative">
          <span className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {formatSecondsToMMSS(timeLeft)}
          </span>
          <span className="block text-xs uppercase font-bold tracking-widest text-slate-400 mt-1">
            {getModeLabel()} • Round {completedSessions + 1}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {isRunning ? (
          <Button
            variant="secondary"
            size="md"
            icon={Pause}
            onClick={onPause}
            className="px-6 shadow-sm"
          >
            Pause
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={onStart}
            className="px-8 shadow-lg shadow-indigo-500/25"
          >
            Start Sprint
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          icon={RotateCcw}
          onClick={onReset}
          title="Reset timer"
        />
      </div>

      {/* Mini tip */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Pro-tip: Silence notifications to enter deep flow state.
        </p>
      </div>
    </Card>
  );
};

export default QuickFocusCard;
