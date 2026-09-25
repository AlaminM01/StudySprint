import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { SUBJECTS, PRIORITIES } from '../../data/subjects';
import { AlertTriangle } from 'lucide-react';


export const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
}) => {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id);
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(2);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setSubjectId(taskToEdit.subjectId || SUBJECTS[0].id);
      setPriority(taskToEdit.priority || 'medium');
      setDueDate(taskToEdit.dueDate || '');
      setEstimatedPomodoros(taskToEdit.estimatedPomodoros || 2);
      setNotes(taskToEdit.notes || '');
    } else {
      setTitle('');
      setSubjectId(SUBJECTS[0].id);
      setPriority('medium');
      // default due date: tomorrow
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      setDueDate(tomorrow);
      setEstimatedPomodoros(2);
      setNotes('');
    }
    setError('');
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a task title or objective.');
      return;
    }

    const payload = {
      id: taskToEdit ? taskToEdit.id : `task-${Date.now()}`,
      title: title.trim(),
      subjectId,
      priority,
      dueDate,
      estimatedPomodoros: Number(estimatedPomodoros) || 1,
      completedPomodoros: taskToEdit ? taskToEdit.completedPomodoros : 0,
      completed: taskToEdit ? taskToEdit.completed : false,
      notes: notes.trim(),
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
      completedAt: taskToEdit ? taskToEdit.completedAt : null,
    };

    onSave(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Edit Study Task' : 'Create New Study Sprint'}
      subtitle={taskToEdit ? 'Update details, deadline, or priority' : 'Break your syllabus down into actionable focus sessions'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Task Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Master Binary Search Trees & implement AVL rotations"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Subject & Priority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Subject Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Subject Category
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.shortCode})
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} Priority
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date & Estimated Pomodoros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Target Deadline
            </label>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Est. Pomodoros (25m each)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={estimatedPomodoros}
                onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
                className="flex-1 accent-indigo-600 cursor-pointer"
              />
              <span className="w-10 text-center font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                {estimatedPomodoros}
              </span>
            </div>
          </div>
        </div>

        {/* Notes & Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Key Objectives / Notes
          </label>
          <textarea
            rows="3"
            placeholder="Key formulas, reference chapters, links or sub-tasks..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            {taskToEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
