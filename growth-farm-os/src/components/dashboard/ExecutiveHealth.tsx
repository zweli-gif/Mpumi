import { Card, CardTitle, CardBadge, HealthRing, ProgressBar, StatusDot } from '../shared';
import {
  bdDeals,
  ventures,
  clients,
  financeSnapshot,
  adminCompliance,
  formatCurrency,
  getDaysAgo,
} from '../../data/sampleData';
import type { BDStage, ClientStatus } from '../../types';
import { BD_STAGE_PROBABILITY } from '../../types';

// Calculate weighted pipeline value
function calculateWeightedPipeline(): number {
  return bdDeals.reduce((sum, deal) => {
    const probability = BD_STAGE_PROBABILITY[deal.stage];
    return sum + deal.value * probability;
  }, 0);
}

// Calculate health scores (simplified calculation)
function calculateHealthScores() {
  // BD Health: Based on pipeline weighted value vs target
  const weightedPipeline = calculateWeightedPipeline();
  const bdTarget = 2500000; // R2.5M target
  const bdHealth = Math.min(Math.round((weightedPipeline / bdTarget) * 100), 100);

  // Ventures: Based on stages and days
  const avgDaysInStage = ventures.reduce((sum, v) => sum + v.daysInStage, 0) / ventures.length;
  const venturesHealth = avgDaysInStage < 30 ? 85 : avgDaysInStage < 60 ? 65 : 45;

  // Clients: Based on status distribution
  const firmClients = clients.filter(c => c.status === 'FIRM').length;
  const clientHealth = Math.round((firmClients / clients.length) * 100);

  // Finance: Based on targets met
  const revenueHealth = Math.round((financeSnapshot.ytdRevenue / (financeSnapshot.annualRevenueTarget / 12)) * 100);
  const financeHealth = Math.min(revenueHealth, 100);

  // Admin: Based on compliance status
  const doneItems = adminCompliance.filter(c => c.status === 'DONE').length;
  const adminHealth = Math.round((doneItems / adminCompliance.length) * 100);

  // Overall weighted average
  const overallHealth = Math.round(
    bdHealth * 0.25 +
    venturesHealth * 0.15 +
    clientHealth * 0.20 +
    financeHealth * 0.30 +
    adminHealth * 0.10
  );

  return { bdHealth, venturesHealth, clientHealth, financeHealth, adminHealth, overallHealth };
}

export function ExecutiveHealth() {
  const scores = calculateHealthScores();
  const weightedPipeline = calculateWeightedPipeline();

  // Group BD deals by stage
  const stageGroups = bdDeals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = { count: 0, value: 0 };
    }
    acc[deal.stage].count++;
    acc[deal.stage].value += deal.value;
    return acc;
  }, {} as Record<BDStage, { count: number; value: number }>);

  // Group clients by status
  const clientGroups = clients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {} as Record<ClientStatus, number>);

  // Get admin alerts (overdue or due soon)
  const adminAlerts = adminCompliance.filter(c => {
    if (c.status === 'DONE') return false;
    if (c.status === 'OVERDUE') return true;
    const daysUntilDue = -getDaysAgo(c.dueDate);
    return daysUntilDue <= 7;
  });

  return (
    <div className="p-4 pb-24 space-y-3">
      {/* Health Score Ring */}
      <div className="bg-white rounded-xl p-5 text-center">
        <HealthRing percentage={scores.overallHealth} />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-4">
          <HealthScoreItem label="BD" score={scores.bdHealth} />
          <HealthScoreItem label="Ventures" score={scores.venturesHealth} />
          <HealthScoreItem label="Clients" score={scores.clientHealth} />
          <HealthScoreItem label="Finance" score={scores.financeHealth} />
          <HealthScoreItem label="Admin" score={scores.adminHealth} />
        </div>
      </div>

      {/* BD Pipeline */}
      <Card>
        <CardTitle badge={<CardBadge>{formatCurrency(weightedPipeline)} weighted</CardBadge>}>
          Business Dev Pipeline
        </CardTitle>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2">
          {(['LEAD', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'CONTRACTING', 'WON'] as BDStage[]).map((stage) => {
            const data = stageGroups[stage] || { count: 0, value: 0 };
            return (
              <PipelineStage
                key={stage}
                name={stage.charAt(0) + stage.slice(1).toLowerCase()}
                count={data.count}
                value={formatCurrency(data.value)}
              />
            );
          })}
        </div>
        <p className="text-[9px] text-soil-muted text-right mt-1">
          Lead 10% &middot; Discovery 40% &middot; Proposal 60% &middot; Negotiation 80% &middot; Contracting 90% &middot; Won 100%
        </p>
      </Card>

      {/* Ventures */}
      <Card>
        <CardTitle>Ventures</CardTitle>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {ventures.map((venture) => (
            <div
              key={venture.id}
              className="flex-shrink-0 bg-canvas rounded-lg p-2.5 border-l-3 border-balloon min-w-[140px]"
            >
              <p className="text-xs font-semibold text-soil">{venture.name}</p>
              <p className="text-[10px] text-soil-muted">
                {venture.stage.replace('_', ' ')}
              </p>
              <p className={`text-[10px] font-semibold mt-1 ${
                venture.daysInStage < 30 ? 'text-success' :
                venture.daysInStage < 60 ? 'text-warning' : 'text-error'
              }`}>
                {venture.daysInStage} days
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Client Health */}
      <Card>
        <CardTitle>Client Health</CardTitle>
        <div className="grid grid-cols-4 gap-2">
          {(['FIRM', 'ATTENTION', 'AT_RISK', 'DORMANT'] as ClientStatus[]).map((status) => (
            <ClientBucket
              key={status}
              status={status}
              count={clientGroups[status] || 0}
            />
          ))}
        </div>
      </Card>

      {/* Finance */}
      <Card>
        <CardTitle>Finance</CardTitle>
        <div className="space-y-3.5">
          <FinanceMetric
            name="YTD Revenue"
            current={financeSnapshot.ytdRevenue}
            target={financeSnapshot.annualRevenueTarget / 12}
            max={financeSnapshot.annualRevenueTarget / 12}
          />
          <FinanceMetric
            name="Cash Reserves"
            current={financeSnapshot.cashReserves}
            target={financeSnapshot.cashTarget}
            max={financeSnapshot.cashTarget}
          />
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-semibold text-soil">Tax Repayment (Jan)</span>
              <span className="text-[11px] text-soil-muted">
                {formatCurrency(financeSnapshot.taxMonthlyPaid)} / {formatCurrency(financeSnapshot.taxMonthlyTarget)}
              </span>
            </div>
            <ProgressBar
              value={financeSnapshot.taxMonthlyPaid}
              max={financeSnapshot.taxMonthlyTarget}
              showValue
            />
            <p className="text-[10px] text-soil-muted mt-1">
              Remaining: {formatCurrency(financeSnapshot.taxDebtOutstanding)}
            </p>
          </div>
        </div>
      </Card>

      {/* Admin Alerts */}
      {adminAlerts.length > 0 && (
        <Card>
          <CardTitle>Admin - Attention</CardTitle>
          <div className="divide-y divide-canvas-dark">
            {adminAlerts.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0">
                <span className="text-sm">
                  {item.status === 'OVERDUE' ? '⚠️' : '⏳'}
                </span>
                <span className="flex-1 text-xs text-soil">{item.item}</span>
                <CardBadge variant={item.status === 'OVERDUE' ? 'error' : 'warning'}>
                  {item.status === 'OVERDUE' ? 'Overdue' : `Due ${new Date(item.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                </CardBadge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// Sub-components
function HealthScoreItem({ label, score }: { label: string; score: number }) {
  const color = score >= 75 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-error';
  return (
    <div className="text-center min-w-[50px]">
      <p className={`text-sm font-bold ${color}`}>{score}%</p>
      <p className="text-[9px] text-soil-muted uppercase">{label}</p>
    </div>
  );
}

function PipelineStage({ name, count, value }: { name: string; count: number; value: string }) {
  return (
    <div className="flex-shrink-0 min-w-[80px] bg-canvas rounded-lg p-2.5 text-center">
      <p className="text-[9px] font-semibold text-soil-muted uppercase mb-1">{name}</p>
      <p className="font-heading text-lg font-bold text-soil">{count}</p>
      <p className="text-[10px] text-soil-muted">{value}</p>
    </div>
  );
}

function ClientBucket({ status, count }: { status: ClientStatus; count: number }) {
  const statusConfig: Record<ClientStatus, { color: 'success' | 'warning' | 'error' | 'muted'; label: string }> = {
    FIRM: { color: 'success', label: 'Firm' },
    ATTENTION: { color: 'warning', label: 'Attention' },
    AT_RISK: { color: 'error', label: 'At Risk' },
    DORMANT: { color: 'muted', label: 'Dormant' },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-canvas rounded-lg p-2.5 text-center">
      <StatusDot status={config.color} size="md" />
      <p className="font-heading text-xl font-bold text-soil mt-1.5">{count}</p>
      <p className="text-[9px] text-soil-muted uppercase">{config.label}</p>
    </div>
  );
}

function FinanceMetric({
  name,
  current,
  target,
  max,
}: {
  name: string;
  current: number;
  target: number;
  max: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-semibold text-soil">{name}</span>
        <span className="text-[11px] text-soil-muted">
          {formatCurrency(current)} / {formatCurrency(target)}
        </span>
      </div>
      <ProgressBar value={current} max={max} target={target} showValue />
    </div>
  );
}
