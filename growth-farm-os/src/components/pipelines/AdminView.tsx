import { useState } from 'react';
import { Check } from '@phosphor-icons/react';
import { Card, CardTitle, Avatar, CardBadge } from '../shared';
import { adminCompliance, getTeamMember } from '../../data/sampleData';
import type { ComplianceCategory, ComplianceStatus } from '../../types';

const categories: { id: ComplianceCategory; label: string }[] = [
  { id: 'LEGAL', label: 'Legal' },
  { id: 'FINANCE', label: 'Finance' },
  { id: 'HR', label: 'HR' },
  { id: 'TAX', label: 'Tax' },
  { id: 'OTHER', label: 'Other' },
];

export function AdminView() {
  const [items, setItems] = useState(adminCompliance);

  // Group by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<ComplianceCategory, typeof adminCompliance>);

  // Sort: Overdue first, then pending, then done
  const sortItems = (categoryItems: typeof adminCompliance) => {
    return [...categoryItems].sort((a, b) => {
      const statusOrder: Record<ComplianceStatus, number> = {
        OVERDUE: 0,
        PENDING: 1,
        DONE: 2,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  };

  const toggleStatus = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'DONE' ? 'PENDING' : 'DONE' }
          : item
      )
    );
  };

  const getStatusBadge = (status: ComplianceStatus, dueDate: string) => {
    if (status === 'DONE') {
      return <CardBadge variant="success">Done</CardBadge>;
    }
    if (status === 'OVERDUE') {
      return <CardBadge variant="error">Overdue</CardBadge>;
    }
    const formattedDate = new Date(dueDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
    return <CardBadge variant="warning">Due {formattedDate}</CardBadge>;
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      {categories.map((category) => {
        const categoryItems = itemsByCategory[category.id];
        if (!categoryItems || categoryItems.length === 0) return null;

        return (
          <Card key={category.id}>
            <CardTitle>{category.label}</CardTitle>
            <div className="space-y-1">
              {sortItems(categoryItems).map((item) => {
                const owner = getTeamMember(item.ownerId);
                const isOverdue = item.status === 'OVERDUE';

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2.5 py-2.5 border-b border-canvas last:border-0 ${
                      isOverdue ? 'bg-error/5 -mx-3.5 px-3.5 rounded' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                        item.status === 'DONE'
                          ? 'bg-success border-success'
                          : 'border-soil-muted bg-white hover:border-soil'
                      }`}
                    >
                      {item.status === 'DONE' && (
                        <Check size={12} weight="bold" className="text-white" />
                      )}
                    </button>

                    {/* Text */}
                    <span
                      className={`flex-1 text-xs ${
                        item.status === 'DONE'
                          ? 'text-soil-muted line-through'
                          : 'text-soil'
                      }`}
                    >
                      {item.item}
                    </span>

                    {/* Owner Avatar */}
                    {owner && (
                      <Avatar
                        initials={owner.initials}
                        color={owner.color}
                        size="sm"
                      />
                    )}

                    {/* Status Badge */}
                    {getStatusBadge(item.status, item.dueDate)}
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
