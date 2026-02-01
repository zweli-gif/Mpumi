import { Avatar, AddButton } from '../shared';
import { bdDeals, getTeamMember, formatCurrency, getDaysAgo } from '../../data/sampleData';
import type { BDStage, BDDeal } from '../../types';

const stages: { id: BDStage; label: string }[] = [
  { id: 'LEAD', label: 'Lead' },
  { id: 'DISCOVERY', label: 'Discovery' },
  { id: 'PROPOSAL', label: 'Proposal' },
  { id: 'NEGOTIATION', label: 'Negotiation' },
  { id: 'CONTRACTING', label: 'Contracting' },
  { id: 'WON', label: 'Won' },
  { id: 'LOST', label: 'Lost' },
];

export function BDPipeline() {
  // Group deals by stage
  const dealsByStage = bdDeals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = [];
    }
    acc[deal.stage].push(deal);
    return acc;
  }, {} as Record<BDStage, BDDeal[]>);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2.5 p-4 min-w-max">
        {stages.map((stage) => {
          const deals = dealsByStage[stage.id] || [];
          const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

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
                  {deals.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>

              {/* Add Button */}
              <AddButton label="Add" onClick={() => {}} className="mt-2" />

              {/* Column Footer - Total */}
              {deals.length > 0 && (
                <div className="text-[9px] text-soil-muted text-center mt-2 pt-2 border-t border-soil/10">
                  Total: {formatCurrency(totalValue)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Deal Card Component
function DealCard({ deal }: { deal: BDDeal }) {
  const owner = getTeamMember(deal.ownerId);
  const daysUntilClose = -getDaysAgo(deal.expectedClose);

  return (
    <div className="bg-white rounded-lg p-2.5 shadow-[0_1px_3px_rgba(74,52,37,0.08)] border-l-3 border-soil cursor-pointer hover:shadow-md transition-shadow">
      <h4 className="text-xs font-semibold text-soil mb-0.5">{deal.client}</h4>
      <p className="text-[10px] text-soil-muted mb-1.5">{deal.opportunity}</p>
      <div className="flex items-center justify-between">
        <span className="font-heading text-[13px] font-semibold text-soil">
          {formatCurrency(deal.value)}
        </span>
        {owner ? (
          <Avatar initials={owner.initials} color={owner.color} size="sm" />
        ) : (
          <span className="text-[9px] text-soil-muted px-1.5 py-0.5 bg-canvas rounded">
            {daysUntilClose > 0 ? `${daysUntilClose}d` : new Date(deal.expectedClose).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </div>
  );
}
