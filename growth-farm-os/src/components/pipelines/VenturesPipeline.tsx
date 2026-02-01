import { Avatar, AddButton } from '../shared';
import { ventures, getTeamMember } from '../../data/sampleData';
import type { VentureStage, Venture } from '../../types';

const stages: { id: VentureStage; label: string }[] = [
  { id: 'IDEA_DUMP', label: 'Idea Dump' },
  { id: 'CONCEPT', label: 'Concept' },
  { id: 'DISCOVERY', label: 'Discovery' },
  { id: 'MVP_BUILD', label: 'MVP Build' },
  { id: 'PILOT', label: 'Pilot' },
  { id: 'LIVE', label: 'Live' },
  { id: 'SCALING', label: 'Scaling' },
];

export function VenturesPipeline() {
  // Group ventures by stage
  const venturesByStage = ventures.reduce((acc, venture) => {
    if (!acc[venture.stage]) {
      acc[venture.stage] = [];
    }
    acc[venture.stage].push(venture);
    return acc;
  }, {} as Record<VentureStage, Venture[]>);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2.5 p-4 min-w-max">
        {stages.map((stage) => {
          const stageVentures = venturesByStage[stage.id] || [];

          return (
            <div
              key={stage.id}
              className="w-[220px] flex-shrink-0 bg-soil/[0.04] rounded-[10px] p-2.5"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center px-1 mb-2.5">
                <span className="text-[10px] font-bold text-soil uppercase">
                  {stage.label}
                </span>
                <span className="text-[10px] font-semibold text-soil-muted">
                  {stageVentures.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {stageVentures.map((venture) => (
                  <VentureCard key={venture.id} venture={venture} />
                ))}
              </div>

              {/* Add Button */}
              <AddButton
                label={stage.id === 'IDEA_DUMP' ? 'Add idea' : 'Add'}
                onClick={() => {}}
                className="mt-2"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Venture Card Component
function VentureCard({ venture }: { venture: Venture }) {
  const owner = getTeamMember(venture.ownerId);

  const getDaysColor = () => {
    if (venture.daysInStage < 30) return 'text-success';
    if (venture.daysInStage < 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-white rounded-lg p-2.5 shadow-[0_1px_3px_rgba(74,52,37,0.08)] border-l-3 border-balloon cursor-pointer hover:shadow-md transition-shadow">
      <h4 className="text-xs font-semibold text-soil mb-0.5">{venture.name}</h4>
      <p className="text-[10px] text-soil-muted mb-1.5">{venture.description}</p>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold ${getDaysColor()}`}>
          {venture.daysInStage} days
        </span>
        {venture.targetDate && (
          <span className="text-[9px] text-soil-muted px-1.5 py-0.5 bg-canvas rounded">
            {new Date(venture.targetDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        )}
        {owner && (
          <Avatar initials={owner.initials} color={owner.color} size="sm" />
        )}
      </div>
    </div>
  );
}
