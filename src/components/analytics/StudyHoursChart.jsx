import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card, { CardHeader } from '../common/Card';
import { Clock } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 rounded-xl bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-slate-700 text-xs">
        <p className="font-bold text-slate-200">{data.displayDate || label}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-slate-300">Focus Hours:</span>
          <span className="font-bold text-indigo-300">{payload[0].value}h</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          {data.minutes} mins • {data.sessionsCompleted || 0} sprints
        </p>
      </div>
    );
  }
  return null;
};

export const StudyHoursChart = ({ dailyLogs = [] }) => {
  const [range, setRange] = useState('7'); // '7' | '14'
  const displayData = range === '7' ? dailyLogs.slice(-7) : dailyLogs.slice(-14);

  return (
    <Card className="p-6">
      <CardHeader
        title="Study Hours Trend"
        subtitle="Daily deep work volume and consistency"
        icon={Clock}
        action={
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setRange('7')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                range === '7'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setRange('14')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                range === '14'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              14 Days
            </button>
          </div>
        }
      />

      <div className="h-64 sm:h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="hoursGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickFormatter={(v) => `${v}h`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#6366F1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#hoursGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StudyHoursChart;
