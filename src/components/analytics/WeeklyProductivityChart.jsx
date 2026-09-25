import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Card, { CardHeader } from '../common/Card';
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-slate-700 text-xs space-y-1">
        <p className="font-bold text-slate-200">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white">
              {entry.value} {entry.dataKey === 'hours' ? 'hours' : 'tasks'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const WeeklyProductivityChart = ({ dailyLogs = [] }) => {
  const last7Days = dailyLogs.slice(-7);

  return (
    <Card className="p-6">
      <CardHeader
        title="Weekly Sprint Velocity"
        subtitle="Study hours vs completed coursework tasks"
        icon={BarChart3}
      />

      <div className="h-64 sm:h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 15, fontSize: 12 }}
            />
            <Bar
              name="Focus Hours"
              dataKey="hours"
              fill="#6366F1"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              name="Tasks Finished"
              dataKey="tasksCompleted"
              fill="#10B981"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WeeklyProductivityChart;
