import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  padding = 'p-6',
  ...props
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-xl
        border border-slate-200/80 dark:border-slate-800/80
        shadow-sm dark:shadow-slate-950/40
        transition-all duration-300
        ${hoverEffect ? 'hover:shadow-xl hover:border-indigo-500/30 hover:-translate-y-0.5' : ''}
        ${glow ? 'before:absolute before:inset-0 before:bg-gradient-to-tr before:from-indigo-500/5 before:via-purple-500/5 before:to-pink-500/5 before:pointer-events-none' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, badge, action, icon: Icon }) => (
  <div className="flex items-center justify-between gap-4 mb-4">
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
            {title}
          </h3>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default Card;
