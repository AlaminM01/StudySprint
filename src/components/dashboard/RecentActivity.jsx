import React from 'react';
import { Timer, CheckCircle2, Award, Zap, ArrowRight } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import { formatRelativeTime } from '../../utils/formatters';
import { SUBJECTS } from '../../data/subjects';

export const RecentActivity = ({
  activities = [],
  onNavigate,
}) => {
  const getSubject = (subjectId) => SUBJECTS.find((s) => s.id === subjectId);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'session_completed':
        return <Timer className="w-4 h-4 text-indigo-500" />;
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'badge_unlocked':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <Zap className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader
        title="Recent Activity"
        subtitle="Your momentum timeline today"
        action={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate && onNavigate('analytics')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Insights
          </Button>
        }
      />

      <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-800/60 overflow-hidden">
        {activities.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No activity logged yet today. Complete your first session to start!
          </div>
        ) : (
          activities.slice(0, 5).map((activity) => {
            const subject = activity.subjectId ? getSubject(activity.subjectId) : null;
            return (
              <div
                key={activity.id}
                className="py-3 flex items-start gap-3 first:pt-0 last:pb-0"
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {subject && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.2 rounded"
                        style={{
                          backgroundColor: `${subject.color}15`,
                          color: subject.color,
                        }}
                      >
                        {subject.shortCode}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;
