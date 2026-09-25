import React, { useState, useMemo } from 'react';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import Button from '../common/Button';
import { Plus, CheckSquare, Clock, Filter, AlertCircle } from 'lucide-react';
import Card from '../common/Card';

export const TasksView = ({
  tasks = [],
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  onStartFocus,
  onIncrementPomo,
  isTaskModalOpen,
  setIsTaskModalOpen,
}) => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  const handleOpenEdit = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenNew = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleSave = (taskData) => {
    if (taskToEdit) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }
  };

  const taskCountsBySubject = useMemo(() => {
    const counts = {};
    tasks.forEach((t) => {
      counts[t.subjectId] = (counts[t.subjectId] || 0) + 1;
    });
    return counts;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchNotes = (task.notes || '').toLowerCase().includes(q);
          if (!matchTitle && !matchNotes) return false;
        }

        // Subject filter
        if (selectedSubject !== 'all' && task.subjectId !== selectedSubject) {
          return false;
        }

        // Priority filter
        if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
          return false;
        }

        // Status filter
        if (selectedStatus === 'pending' && task.completed) return false;
        if (selectedStatus === 'completed' && !task.completed) return false;
        if (selectedStatus === 'urgent' && task.priority !== 'urgent') return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDateAsc') {
          return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        }
        if (sortBy === 'dueDateDesc') {
          return new Date(b.dueDate || '1970-01-01') - new Date(a.dueDate || '1970-01-01');
        }
        if (sortBy === 'priorityDesc') {
          const priorityWeights = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        }
        if (sortBy === 'pomosDesc') {
          return b.estimatedPomodoros - a.estimatedPomodoros;
        }
        if (sortBy === 'titleAsc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, searchQuery, selectedSubject, selectedPriority, selectedStatus, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSubject !== 'all' ||
    selectedPriority !== 'all' ||
    selectedStatus !== 'all' ||
    sortBy !== 'dueDateAsc';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
    setSortBy('dueDateAsc');
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header bar with Stats & New Task Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Sprint Tasks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize coursework, manage deadlines, and track Pomodoro requirements
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={handleOpenNew}
          className="shadow-lg shadow-indigo-500/25 shrink-0"
        >
          Add Study Task
        </Button>
      </div>

      {/* Filters and search section */}
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        taskCountsBySubject={taskCountsBySubject}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={onToggleComplete}
        onEditTask={handleOpenEdit}
        onDeleteTask={onDeleteTask}
        onStartFocus={onStartFocus}
        onIncrementPomo={onIncrementPomo}
        onOpenNewTask={handleOpenNew}
      />

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSave}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default TasksView;
