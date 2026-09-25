import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Card, { CardHeader } from '../common/Card';
import { PieChart as PieIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 rounded-xl bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-slate-700 text-xs">
        <p className="font-bold flex items-center gap-1.5" style={{ color: data.color }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
          {data.name}
        </p>
        <p className="text-slate-300 mt-1">
          {data.focusHours} hours ({data.focusMinutes} mins)
        </p>
        <p className="text-[11px] text-slate-400">
          {data.tasksCompleted} tasks completed
        </p>
      </div>
    );
  }
  return null;
};

export const SubjectBreakdownChart = ({ subjectData = [] }) => {
  const totalMinutes = subjectData.reduce((sum, s) => sum + (s.focusMinutes || 0), 0);

  return (
    <Card className="p-6">
      <CardHeader
        title="Subject Distribution"
        subtitle="Time allocated per academic domain"
        icon={PieIcon}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
        {/* Donut Chart */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={subjectData}
                dataKey="focusMinutes"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xs uppercase font-semibold text-slate-400">
              Total
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {Math.round(totalMinutes / 60)}h
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 w-full space-y-2">
          {subjectData.map((sub) => {
            const percentage = totalMinutes > 0 ? Math.round((sub.focusMinutes / totalMinutes) * 100) : 0;
            return (
              <div key={sub.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: sub.color }}
                  />
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                    {sub.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {sub.focusHours}h
                  </span>
                  <span className="text-slate-400 w-8 text-right font-mono">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default SubjectBreakdownChart;
