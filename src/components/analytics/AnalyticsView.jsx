import React from 'react';
import AnalyticsOverviewCards from './AnalyticsOverviewCards';
import StudyHoursChart from './StudyHoursChart';
import WeeklyProductivityChart from './WeeklyProductivityChart';
import SubjectBreakdownChart from './SubjectBreakdownChart';
import ProductivityScoreCard from './ProductivityScoreCard';

export const AnalyticsView = ({
  dailyLogs = [],
  subjectData = [],
  weeklyTrends = {},
  todayFocusMinutes = 75,
  completedTasks = 2,
  totalTasks = 4,
  currentStreak = 5,
  productivityScore = 88,
}) => {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Performance & Learning Analytics
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Quantify your study habits, identify peak productivity hours, and optimize coursework distribution
        </p>
      </div>

      {/* Summary Metrics */}
      <AnalyticsOverviewCards
        weeklyFocusHours={weeklyTrends.weeklyFocusHours || 14.5}
        weeklyTasksCompleted={weeklyTrends.weeklyTasksCompleted || 19}
        avgDailyMinutes={weeklyTrends.avgDailyMinutes || 124}
        topSubjectName="Artificial Intelligence & ML"
      />

      {/* Primary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudyHoursChart dailyLogs={dailyLogs} />
        <WeeklyProductivityChart dailyLogs={dailyLogs} />
      </div>

      {/* Secondary Row: Score Gauge + Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <ProductivityScoreCard
            score={productivityScore}
            focusMinutes={todayFocusMinutes}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            currentStreak={currentStreak}
          />
        </div>

        <div className="lg:col-span-7">
          <SubjectBreakdownChart subjectData={subjectData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
