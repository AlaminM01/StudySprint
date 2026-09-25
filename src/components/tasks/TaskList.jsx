import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from '../common/EmptyState';
import { CheckCircle2, ListTodo, Plus } from 'lucide-react';

export const TaskList = ({
  tasks = [],
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onStartFocus,
  onIncrementPomo,
  onOpenNewTask,
}) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks found"
        description="Plan your next focus sprint by adding course assignments, topics to review, or code exercises."
        actionLabel="Create First Task"
        onAction={onOpenNewTask}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Sprint Completion Velocity
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {completedCount} of {totalCount} Completed
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              ({progressPercent}%)
            </span>
          </div>
        </div>

        <div className="w-full sm:w-48">
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task Items */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onStartFocus={onStartFocus}
            onIncrementPomo={onIncrementPomo}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
