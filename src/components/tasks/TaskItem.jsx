import React from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  MoreVertical,
  Play,
  Pencil,
  Trash2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { SUBJECTS, PRIORITIES } from '../../data/subjects';
import Button from '../common/Button';

export const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onStartFocus,
  onIncrementPomo,
}) => {
  const subject = SUBJECTS.find((s) => s.id === task.subjectId) || SUBJECTS[0];
  const priority = PRIORITIES.find((p) => p.id === task.priority) || PRIORITIES[1];

  const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
  const isDueToday = !task.completed && task.dueDate && task.dueDate === new Date().toISOString().split('T')[0];

  return (
    <div
      className={`
        group relative rounded-2xl p-4 sm:p-5 transition-all duration-300
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
        border border-slate-200/80 dark:border-slate-800/80
        shadow-sm hover:shadow-md
        ${task.completed ? 'opacity-70 dark:opacity-60 bg-slate-50/50 dark:bg-slate-900/40' : 'hover:border-indigo-500/40'}
      `}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Toggle Checkmark button */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-500 transition-colors focus:outline-none"
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-emerald-500 transition-colors" />
          )}
        </button>

        {/* Content body */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <h4
              className={`text-sm sm:text-base font-semibold leading-snug break-words ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.title}
            </h4>

            {/* Quick Actions (Edit, Delete, Start Focus) */}
            <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-auto shrink-0">
              {!task.completed && onStartFocus && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Play}
                  onClick={() => onStartFocus(task)}
                  className="py-1 px-2.5 text-xs shadow-none"
                  title="Focus on this task with Pomodoro"
                >
                  Sprint
                </Button>
              )}

              <button
                type="button"
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit task"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notes description if available */}
          {task.notes && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1 line-clamp-2">
              <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <span>{task.notes}</span>
            </p>
          )}

          {/* Metadata Badges Footer */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
            {/* Subject Tag */}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium"
              style={{
                backgroundColor: `${subject.color}15`,
                color: subject.color,
                border: `1px solid ${subject.color}30`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              {subject.name}
            </span>

            {/* Priority Tag */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider border ${priority.color}`}
            >
              {priority.label}
            </span>

            {/* Due Date Indicator */}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                  isOverdue
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    : isDueToday
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {isOverdue ? (
                  <AlertCircle className="w-3 h-3 text-rose-500" />
                ) : (
                  <Calendar className="w-3 h-3" />
                )}
                <span>
                  {isDueToday
                    ? 'Today'
                    : isOverdue
                    ? `Overdue (${task.dueDate})`
                    : task.dueDate}
                </span>
              </span>
            )}

            {/* Pomodoro sessions count */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ml-auto">
              <Clock className="w-3 h-3 text-indigo-500" />
              <span>
                {task.completedPomodoros} / {task.estimatedPomodoros} pomos
              </span>
              {!task.completed && onIncrementPomo && (
                <button
                  type="button"
                  onClick={() => onIncrementPomo(task.id)}
                  className="hover:text-indigo-500 font-bold px-1 transition-colors text-xs"
                  title="Increment pomo completed"
                >
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
