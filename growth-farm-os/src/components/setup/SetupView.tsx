import { Card, Avatar, AddButton } from '../shared';
import { teamMembers, annualGoals } from '../../data/sampleData';
import type { FocusArea } from '../../types';

const focusAreaLabels: Record<FocusArea, string> = {
  COMMUNITY_GROWTH: 'Community Growth',
  IMPACT_DELIVERY: 'Impact Delivery',
  NEW_FRONTIERS: 'New Frontiers',
  STEWARDSHIP: 'Stewardship',
  PURPOSE_PLATFORM: 'Purpose & Platform',
};

const focusAreas: FocusArea[] = [
  'COMMUNITY_GROWTH',
  'IMPACT_DELIVERY',
  'NEW_FRONTIERS',
  'STEWARDSHIP',
  'PURPOSE_PLATFORM',
];

export function SetupView() {
  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Company Purpose */}
      <section>
        <h2 className="font-heading text-base font-semibold text-soil mb-3">
          Company Purpose
        </h2>
        <Card>
          <div className="text-center py-4">
            <h3 className="font-heading text-lg font-semibold text-soil mb-2">
              Growth Farm
            </h3>
            <p className="text-sm text-soil-muted italic mb-4">
              "Building generational wealth through African innovation"
            </p>
            <p className="text-xs text-soil leading-relaxed">
              We are a holding company combining a design consultancy with a venture fund,
              focused on creating lasting impact across Africa through strategic partnerships
              and innovative solutions.
            </p>
          </div>
        </Card>
      </section>

      {/* Team */}
      <section>
        <h2 className="font-heading text-base font-semibold text-soil mb-3">
          Team
        </h2>
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <Card key={member.id} hover onClick={() => {}}>
              <div className="flex items-center gap-3">
                <Avatar
                  initials={member.initials}
                  color={member.color}
                  size="md"
                  mood={member.mood}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-soil">{member.name}</p>
                  <p className="text-[10px] text-soil-muted">{member.role}</p>
                </div>
                <svg
                  className="w-4 h-4 text-soil-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Annual Goals 2026 */}
      <section>
        <h2 className="font-heading text-base font-semibold text-soil mb-3">
          Annual Goals 2026
        </h2>
        <div className="space-y-3">
          {focusAreas.map((area) => {
            const areaGoals = annualGoals.filter((g) => g.area === area);
            return (
              <Card key={area}>
                <div className="text-xs font-bold text-soil uppercase mb-2.5 pb-2 border-b border-canvas">
                  {focusAreaLabels[area]}
                </div>
                {areaGoals.length > 0 ? (
                  <div className="space-y-2">
                    {areaGoals.map((goal) => (
                      <div
                        key={goal.id}
                        className="flex justify-between items-center py-1.5"
                      >
                        <span className="text-sm text-soil">{goal.title}</span>
                        <span className="text-xs text-soil-muted font-semibold">
                          {goal.metric}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-soil-muted italic py-2">
                    No goals set
                  </p>
                )}
                <AddButton label="Add goal" onClick={() => {}} className="mt-2" />
              </Card>
            );
          })}
        </div>
      </section>

      {/* Monthly Goals - January */}
      <section>
        <h2 className="font-heading text-base font-semibold text-soil mb-3">
          Monthly Goals - January
        </h2>
        <div className="space-y-3">
          {focusAreas.map((area) => (
            <Card key={area}>
              <div className="text-xs font-bold text-soil uppercase mb-2.5 pb-2 border-b border-canvas">
                {focusAreaLabels[area]}
              </div>
              <p className="text-xs text-soil-muted italic py-2">
                No monthly targets set
              </p>
              <AddButton label="Set monthly target" onClick={() => {}} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
