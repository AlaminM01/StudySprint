import React from 'react';
import { CheckCircle2, Circle, ArrowRight, Plus, Calendar, Clock } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import { SUBJECTS } from '../../data/subjects';

export const TodayTasksCard = ({
  tasks = [],
  onToggleTask,
  onOpenNewTask,
  onViewAllTasks,
}) => {
  const getSubject = (subjectId) => SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];

  const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 4);
  const completedToday = tasks.filter((t) => t.completed).length;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader
        title="Today's Sprints"
        subtitle={`${completedToday} finished • ${pendingTasks.length} remaining`}
        action={
          <Button variant="ghost" size="sm" onClick={onViewAllTasks} icon={ArrowRight} iconPosition="right">
            All Tasks
          </Button>
        }
      />

      <div className="flex-1 space-y-2.5">
        {pendingTasks.length === 0 ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              All caught up for today!
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Enjoy your break or plan your next sprint.
            </p>
            {onOpenNewTask && (
              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={onOpenNewTask}
                className="mt-4"
              >
                Add Another Task
              </Button>
            )}
          </div>
        ) : (
          pendingTasks.map((task) => {
            const subject = getSubject(task.subjectId);
            return (
              <div
                key={task.id}
                className="group flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border border-slate-200/60 dark:border-slate-800/60 transition-all duration-200"
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors shrink-0"
                  aria-label="Toggle task"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 group-hover:text-emerald-500 transition-colors" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium leading-snug truncate ${
                      task.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {/* Subject badge */}
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{
                        backgroundColor: `${subject.color}15`,
                        color: subject.color,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      {subject.shortCode}
                    </span>

                    {/* Pomodoro count */}
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3" />
                      {task.completedPomodoros}/{task.estimatedPomodoros} pomos
                    </span>

                    {/* Priority */}
                    {task.priority === 'urgent' && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-500/10 text-rose-500 uppercase tracking-wider">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {pendingTasks.length > 0 && onOpenNewTask && (
        <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80">
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={onOpenNewTask}
            className="w-full text-xs"
          >
            Quick Add Task
          </Button>
        </div>
      )}
    </Card>
  );
};

export default TodayTasksCard;
