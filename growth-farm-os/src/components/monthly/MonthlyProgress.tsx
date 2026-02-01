import { useState } from 'react';
import { Card, CardTitle, CardBadge, ProgressBar, Avatar } from '../shared';
import { annualGoals, getTeamMember } from '../../data/sampleData';
import type { FocusArea } from '../../types';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const focusAreaLabels: Record<FocusArea, string> = {
  COMMUNITY_GROWTH: 'Community Growth',
  IMPACT_DELIVERY: 'Impact Delivery',
  NEW_FRONTIERS: 'New Frontiers',
  STEWARDSHIP: 'Stewardship',
  PURPOSE_PLATFORM: 'Purpose & Platform',
};

export function MonthlyProgress() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Mock progress data for goals
  const goalProgress = annualGoals.map((goal) => {
    // Simulate progress based on month (for demo)
    const monthlyTarget = 100 / 12;
    const expectedProgress = (selectedMonth + 1) * monthlyTarget;
    const actualProgress = Math.random() * expectedProgress * 1.2;
    const status = actualProgress >= expectedProgress * 0.9
      ? 'ON_TRACK'
      : actualProgress >= expectedProgress * 0.6
      ? 'ATTENTION'
      : 'AT_RISK';

    return {
      ...goal,
      actual: Math.round(actualProgress),
      target: Math.round(expectedProgress),
      status,
    };
  });

  return (
    <div className="pb-24">
      {/* Month Selector */}
      <div className="bg-white px-4 py-3 border-b border-canvas-dark sticky top-[52px] z-40">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedMonth === index
                  ? 'bg-soil text-canvas'
                  : 'bg-canvas text-soil-muted hover:bg-canvas-dark'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Progress Cards */}
      <div className="p-4 space-y-3">
        <h3 className="font-heading text-base font-semibold text-soil mb-3">
          {months[selectedMonth]} 2026 Progress
        </h3>

        {goalProgress.map((goal) => {
          const owner = getTeamMember(goal.ownerId);
          const statusVariant =
            goal.status === 'ON_TRACK' ? 'success' :
            goal.status === 'ATTENTION' ? 'warning' : 'error';

          return (
            <Card key={goal.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-info bg-info/10 px-2 py-0.5 rounded-full">
                      {focusAreaLabels[goal.area]}
                    </span>
                    <CardBadge variant={statusVariant}>
                      {goal.status.replace('_', ' ')}
                    </CardBadge>
                  </div>
                  <h4 className="text-sm font-semibold text-soil">{goal.title}</h4>
                  <p className="text-[11px] text-soil-muted">{goal.metric}</p>
                </div>
                {owner && (
                  <Avatar initials={owner.initials} color={owner.color} size="sm" />
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-soil-muted">Progress</span>
                  <span className="text-[10px] text-soil-muted">
                    {goal.actual}% / {goal.target}%
                  </span>
                </div>
                <ProgressBar value={goal.actual} max={100} target={goal.target} />
              </div>
            </Card>
          );
        })}

        {/* Compliance Milestones */}
        <Card className="mt-6">
          <CardTitle>Compliance Milestones</CardTitle>
          <div className="space-y-2">
            <ComplianceItem name="VAT Return" dueDate="25 Jan" status="pending" />
            <ComplianceItem name="Bank Reconciliation" dueDate="5 Feb" status="done" />
            <ComplianceItem name="Contractor Agreements" dueDate="15 Jan" status="overdue" />
            <ComplianceItem name="Client MSAs Review" dueDate="1 Feb" status="pending" />
          </div>
        </Card>
      </div>
    </div>
  );
}

interface ComplianceItemProps {
  name: string;
  dueDate: string;
  status: 'done' | 'pending' | 'overdue';
}

function ComplianceItem({ name, dueDate, status }: ComplianceItemProps) {
  const statusConfig = {
    done: { class: 'bg-success/15 text-success', label: 'Done' },
    pending: { class: 'bg-warning/15 text-warning', label: `Due ${dueDate}` },
    overdue: { class: 'bg-error/15 text-error', label: 'Overdue' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-2 border-b border-canvas last:border-0">
      <span className="text-sm text-soil">{name}</span>
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.class}`}>
        {config.label}
      </span>
    </div>
  );
}
