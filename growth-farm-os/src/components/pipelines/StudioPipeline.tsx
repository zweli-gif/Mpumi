import { Avatar, AddButton } from '../shared';
import { studioProjects, getTeamMember } from '../../data/sampleData';
import type { StudioStage, StudioProject } from '../../types';

const stages: { id: StudioStage; label: string }[] = [
  { id: 'SCOPING', label: 'Scoping' },
  { id: 'CONTRACTED', label: 'Contracted' },
  { id: 'IN_PROGRESS', label: 'In Progress' },
  { id: 'REVIEW', label: 'Review' },
  { id: 'COMPLETE', label: 'Complete' },
  { id: 'CLOSED', label: 'Closed' },
];

export function StudioPipeline() {
  // Group projects by stage
  const projectsByStage = studioProjects.reduce((acc, project) => {
    if (!acc[project.stage]) {
      acc[project.stage] = [];
    }
    acc[project.stage].push(project);
    return acc;
  }, {} as Record<StudioStage, StudioProject[]>);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2.5 p-4 min-w-max">
        {stages.map((stage) => {
          const stageProjects = projectsByStage[stage.id] || [];

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
                  {stageProjects.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {stageProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Add Button */}
              <AddButton label="Add" onClick={() => {}} className="mt-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: StudioProject }) {
  const owner = getTeamMember(project.ownerId);
  const hoursPercentage = Math.round((project.hoursUsed / project.hoursBudget) * 100);

  const getHoursColor = () => {
    if (hoursPercentage <= 80) return 'text-success';
    if (hoursPercentage <= 100) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-white rounded-lg p-2.5 shadow-[0_1px_3px_rgba(74,52,37,0.08)] border-l-3 border-success cursor-pointer hover:shadow-md transition-shadow">
      <h4 className="text-xs font-semibold text-soil mb-0.5">{project.project}</h4>
      <p className="text-[10px] text-soil-muted mb-1.5">{project.client}</p>
      <div className="flex items-center justify-between">
        <span className="font-heading text-[13px] font-semibold text-soil">
          {project.hoursUsed}/{project.hoursBudget}
        </span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${getHoursColor()} bg-current/10`}>
          {hoursPercentage}%
        </span>
        {owner && (
          <Avatar initials={owner.initials} color={owner.color} size="sm" />
        )}
      </div>
    </div>
  );
}
