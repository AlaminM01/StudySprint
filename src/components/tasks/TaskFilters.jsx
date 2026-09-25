import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { SUBJECTS, PRIORITIES } from '../../data/subjects';


export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
  taskCountsBySubject = {},
}) => {
  return (
    <div className="space-y-4">
      {/* Top Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks by title or notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
            >
              <option value="dueDateAsc">Due Date (Earliest)</option>
              <option value="dueDateDesc">Due Date (Latest)</option>
              <option value="priorityDesc">Priority (Urgent First)</option>
              <option value="pomosDesc">Most Pomodoros</option>
              <option value="titleAsc">Alphabetical (A-Z)</option>
            </select>
            <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row: Status & Priority Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Completed' },
            { id: 'urgent', label: 'Urgent' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => onStatusChange(st.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedStatus === st.id
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 mr-1 hidden sm:inline">
            Priority:
          </span>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject Category Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSubjectChange('all')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedSubject === 'all'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800/60'
          }`}
        >
          All Subjects
        </button>

        {SUBJECTS.map((sub) => {
          const isSelected = selectedSubject === sub.id;
          const count = taskCountsBySubject[sub.id] || 0;

          return (
            <button
              key={sub.id}
              onClick={() => onSubjectChange(sub.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'shadow-sm text-white'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800/60'
              }`}
              style={{
                backgroundColor: isSelected ? sub.color : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSelected ? '#ffffff' : sub.color }}
              />
              <span>{sub.name}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilters;
