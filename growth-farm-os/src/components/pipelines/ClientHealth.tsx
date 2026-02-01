import { Avatar, AddButton } from '../shared';
import { clients, getTeamMember, formatCurrency, getDaysAgo } from '../../data/sampleData';
import type { ClientStatus, Client } from '../../types';

const statuses: { id: ClientStatus; label: string; color: string }[] = [
  { id: 'FIRM', label: 'Firm', color: 'border-success' },
  { id: 'ATTENTION', label: 'Attention', color: 'border-warning' },
  { id: 'AT_RISK', label: 'At Risk', color: 'border-error' },
  { id: 'DORMANT', label: 'Dormant', color: 'border-soil-muted' },
];

export function ClientHealth() {
  // Group clients by status
  const clientsByStatus = clients.reduce((acc, client) => {
    if (!acc[client.status]) {
      acc[client.status] = [];
    }
    acc[client.status].push(client);
    return acc;
  }, {} as Record<ClientStatus, Client[]>);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2.5 p-4 min-w-max">
        {statuses.map((status) => {
          const statusClients = clientsByStatus[status.id] || [];

          return (
            <div
              key={status.id}
              className="w-[220px] flex-shrink-0 bg-soil/[0.04] rounded-[10px] p-2.5"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center px-1 mb-2.5">
                <span className="text-[10px] font-bold text-soil uppercase">
                  {status.label}
                </span>
                <span className="text-[10px] font-semibold text-soil-muted">
                  {statusClients.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {statusClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    borderColor={status.color}
                  />
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

// Client Card Component
function ClientCard({ client, borderColor }: { client: Client; borderColor: string }) {
  const owner = getTeamMember(client.relationshipOwnerId);
  const daysSinceContact = getDaysAgo(client.lastContact);

  const getContactColor = () => {
    if (daysSinceContact <= 7) return 'text-success';
    if (daysSinceContact <= 14) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-white rounded-lg p-2.5 shadow-[0_1px_3px_rgba(74,52,37,0.08)] border-l-3 ${borderColor} cursor-pointer hover:shadow-md transition-shadow`}>
      <h4 className="text-xs font-semibold text-soil mb-0.5">{client.clientName}</h4>
      <p className="text-[10px] text-soil-muted mb-1.5">
        {client.activeProjects} project{client.activeProjects !== 1 ? 's' : ''}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-heading text-[13px] font-semibold text-soil">
          {formatCurrency(client.ytdRevenue)}
        </span>
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded bg-canvas ${getContactColor()}`}>
          {daysSinceContact}d
        </span>
        {owner && (
          <Avatar initials={owner.initials} color={owner.color} size="sm" />
        )}
      </div>
    </div>
  );
}
