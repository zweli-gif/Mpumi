import { useState } from 'react';
import { CaretLeft, CaretRight, Check, LinkSimple } from '@phosphor-icons/react';
import { AddButton, Avatar } from '../shared';
import { weeklyActivities, getTeamMember, annualGoals } from '../../data/sampleData';
import type { WeeklyActivity, FocusArea } from '../../types';

// Focus area configuration
const focusAreaConfig: Record<FocusArea, { label: string; color: string }> = {
  COMMUNITY_GROWTH: { label: 'Community Growth', color: 'bg-info/10 text-info' },
  IMPACT_DELIVERY: { label: 'Impact Delivery', color: 'bg-success/10 text-success' },
  NEW_FRONTIERS: { label: 'New Frontiers', color: 'bg-balloon/20 text-balloon' },
  STEWARDSHIP: { label: 'Stewardship', color: 'bg-warning/10 text-warning' },
  PURPOSE_PLATFORM: { label: 'Purpose & Platform', color: 'bg-soil/10 text-soil' },
};

// Group activities by focus area
function groupByFocusArea(activities: WeeklyActivity[]): Record<FocusArea, WeeklyActivity[]> {
  return activities.reduce((acc, activity) => {
    if (!acc[activity.focusArea]) {
      acc[activity.focusArea] = [];
    }
    acc[activity.focusArea].push(activity);
    return acc;
  }, {} as Record<FocusArea, WeeklyActivity[]>);
}

export function WeeklyPlanner() {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Calculate week dates
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weekNumber = Math.ceil(
    (startOfWeek.getTime() - new Date(startOfWeek.getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });

  const groupedActivities = groupByFocusArea(weeklyActivities);

  return (
    <div className="pb-24">
      {/* Week Header */}
      <div className="bg-white px-4 py-3 border-b border-canvas-dark sticky top-[52px] z-40 flex items-center justify-between">
        <h2 className="font-heading text-base font-semibold text-soil">
          Week {weekNumber} &middot; {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentWeek((w) => w - 1)}
            className="w-7 h-7 rounded-full bg-canvas flex items-center justify-center hover:bg-canvas-dark transition-colors"
          >
            <CaretLeft size={14} weight="bold" className="text-soil" />
          </button>
          <button
            onClick={() => setCurrentWeek((w) => w + 1)}
            className="w-7 h-7 rounded-full bg-canvas flex items-center justify-center hover:bg-canvas-dark transition-colors"
          >
            <CaretRight size={14} weight="bold" className="text-soil" />
          </button>
        </div>
      </div>

      {/* Activities by Focus Area */}
      <div className="p-4 space-y-5">
        {Object.entries(groupedActivities).map(([area, activities]) => {
          const config = focusAreaConfig[area as FocusArea];
          return (
            <div key={area}>
              <h3 className="text-[13px] font-bold text-soil uppercase mb-2.5">
                {config.label}
              </h3>
              <div className="space-y-2">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
                <AddButton label="Add activity" onClick={() => {}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Activity Card Component
function ActivityCard({ activity }: { activity: WeeklyActivity }) {
  const [isChecked, setIsChecked] = useState(activity.status === 'DONE');
  const owner = getTeamMember(activity.ownerId);
  const linkedGoal = annualGoals.find((g) => g.id === activity.monthlyGoalId);

  const statusConfig: Record<string, { class: string; label: string }> = {
    PENDING: { class: 'bg-soil/10 text-soil-muted', label: 'Pending' },
    IN_PROGRESS: { class: 'bg-info/15 text-info', label: 'In Progress' },
    DONE: { class: 'bg-success/15 text-success', label: 'Done' },
    BLOCKED: { class: 'bg-error/15 text-error', label: 'Blocked' },
  };

  const status = isChecked ? 'DONE' : activity.status;
  const config = statusConfig[status];

  const borderColor =
    status === 'DONE'
      ? 'border-l-success'
      : status === 'BLOCKED'
      ? 'border-l-error'
      : 'border-l-soil-muted';

  return (
    <div
      className={`bg-white rounded-lg p-3 border-l-3 ${borderColor} ${
        status === 'DONE' ? 'opacity-70' : ''
      }`}
    >
      <div className="flex gap-2.5 items-start mb-2">
        {/* Checkbox */}
        <button
          onClick={() => setIsChecked(!isChecked)}
          className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
            isChecked
              ? 'bg-success border-success'
              : 'border-soil-muted bg-white hover:border-soil'
          }`}
        >
          {isChecked && <Check size={12} weight="bold" className="text-white" />}
        </button>

        {/* Text */}
        <span
          className={`flex-1 text-[13px] text-soil ${
            isChecked ? 'line-through text-soil-muted' : ''
          }`}
        >
          {activity.description}
        </span>

        {/* Owner Avatar */}
        {owner && (
          <Avatar initials={owner.initials} color={owner.color} size="sm" />
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 ml-[30px]">
        {linkedGoal && (
          <span className="text-[10px] text-info bg-info/10 px-2 py-0.5 rounded-full">
            {linkedGoal.title}
          </span>
        )}
        <span className="text-[10px] text-soil-muted font-semibold">
          {activity.dueDay}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${config.class}`}>
          {config.label}
        </span>
        {activity.driveLink && (
          <a
            href={activity.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-info flex items-center gap-0.5"
          >
            <LinkSimple size={10} weight="bold" />
            Link
          </a>
        )}
      </div>
    </div>
  );
}
