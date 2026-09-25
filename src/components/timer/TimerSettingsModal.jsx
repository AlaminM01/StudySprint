import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { Sliders, Volume2, Bell, RefreshCw, Zap } from 'lucide-react';

export const TimerSettingsModal = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  const handleResetDefaults = () => {
    setFormData({
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      soundNotification: true,
      ambientSound: 'none',
      volume: 0.7,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pomodoro Preferences"
      subtitle="Customize interval durations, automation, and audio notifications"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Durations Group */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Time Durations (Minutes)</span>
          </h4>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Focus
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.workDuration}
                onChange={(e) =>
                  setFormData({ ...formData, workDuration: Math.max(1, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Break
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.shortBreakDuration}
                onChange={(e) =>
                  setFormData({ ...formData, shortBreakDuration: Math.max(1, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Long Break
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={formData.longBreakDuration}
                onChange={(e) =>
                  setFormData({ ...formData, longBreakDuration: Math.max(1, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Long Break Interval */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Long Break Interval
            </label>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Every {formData.longBreakInterval} sessions
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            step="1"
            value={formData.longBreakInterval}
            onChange={(e) =>
              setFormData({ ...formData, longBreakInterval: Number(e.target.value) })
            }
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Automation Toggles */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Workflow Automation</span>
          </h4>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Auto-start Breaks
            </span>
            <input
              type="checkbox"
              checked={formData.autoStartBreaks}
              onChange={(e) => setFormData({ ...formData, autoStartBreaks: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Auto-start Pomodoros
            </span>
            <input
              type="checkbox"
              checked={formData.autoStartPomodoros}
              onChange={(e) => setFormData({ ...formData, autoStartPomodoros: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Sound Chime on Session Finish
            </span>
            <input
              type="checkbox"
              checked={formData.soundNotification}
              onChange={(e) => setFormData({ ...formData, soundNotification: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            icon={RefreshCw}
            onClick={handleResetDefaults}
            className="text-slate-500 text-xs"
          >
            Reset Defaults
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Save Settings
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TimerSettingsModal;
