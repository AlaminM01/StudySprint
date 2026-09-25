import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        inline-flex items-center gap-2 p-2.5 rounded-xl
        bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
        hover:bg-slate-200 dark:hover:bg-slate-700
        hover:text-slate-900 dark:hover:text-white
        transition-all duration-300 cursor-pointer select-none
        border border-slate-200/80 dark:border-slate-700/80
        ${className}
      `}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-500 hover:rotate-90" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-500" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
