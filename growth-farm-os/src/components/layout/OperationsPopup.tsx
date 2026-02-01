import {
  X,
  TrendUp,
  Briefcase,
  Rocket,
  Coins,
  ShieldCheck,
  Users,
  CaretRight,
} from '@phosphor-icons/react';
import { bdDeals, ventures, studioProjects, adminCompliance, teamMembers } from '../../data/sampleData';

interface OperationsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (area: string) => void;
}

interface OperationArea {
  id: string;
  nomenclature: string;
  traditional: string;
  icon: React.ReactNode;
  count: number;
  route: string;
}

export function OperationsPopup({ isOpen, onClose, onNavigate }: OperationsPopupProps) {
  if (!isOpen) return null;

  // Calculate counts from data
  const bdCount = bdDeals.filter(d => !['WON', 'LOST'].includes(d.stage)).length;
  const studioCount = studioProjects.filter(p => p.stage !== 'CLOSED').length;
  const venturesCount = ventures.filter(v => v.stage !== 'SCALING').length;
  const adminCount = adminCompliance.filter(c => c.status !== 'DONE').length;
  const teamCount = teamMembers.length;

  const areas: OperationArea[] = [
    {
      id: 'bd',
      nomenclature: 'Community Growth',
      traditional: 'BD & Marketing',
      icon: <TrendUp size={24} weight="duotone" />,
      count: bdCount,
      route: 'bd',
    },
    {
      id: 'studio',
      nomenclature: 'Impact Delivery',
      traditional: 'Client Projects',
      icon: <Briefcase size={24} weight="duotone" />,
      count: studioCount,
      route: 'studio',
    },
    {
      id: 'ventures',
      nomenclature: 'New Frontiers',
      traditional: 'Ventures',
      icon: <Rocket size={24} weight="duotone" />,
      count: venturesCount,
      route: 'ventures',
    },
    {
      id: 'finance',
      nomenclature: 'Stewardship',
      traditional: 'Finance',
      icon: <Coins size={24} weight="duotone" />,
      count: 0,
      route: 'finance',
    },
    {
      id: 'admin',
      nomenclature: 'Purpose & Platform',
      traditional: 'Admin & Ops',
      icon: <ShieldCheck size={24} weight="duotone" />,
      count: adminCount,
      route: 'admin',
    },
    {
      id: 'team',
      nomenclature: 'The Family',
      traditional: 'Team',
      icon: <Users size={24} weight="duotone" />,
      count: teamCount,
      route: 'team',
    },
  ];

  const handleAreaClick = (area: OperationArea) => {
    onNavigate(area.route);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-soil/90 z-[150] flex flex-col animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="font-heading text-xl font-semibold text-canvas">
          Where are you working today?
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-canvas/70 hover:text-canvas rounded-lg hover:bg-white/10 transition-colors"
        >
          <X size={24} weight="bold" />
        </button>
      </div>

      {/* Areas Grid */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => handleAreaClick(area)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-all btn-press group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-balloon/20 rounded-lg text-balloon">
                  {area.icon}
                </div>
                {area.count > 0 && (
                  <span className="px-2 py-0.5 bg-balloon text-soil text-xs font-semibold rounded-full">
                    {area.count}
                  </span>
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold text-canvas mb-0.5">
                {area.nomenclature}
              </h3>
              <p className="text-xs text-canvas/60">{area.traditional}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-balloon group-hover:translate-x-1 transition-transform">
                <span>Enter</span>
                <CaretRight size={14} weight="bold" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
