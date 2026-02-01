import type {
  TeamMember,
  BDDeal,
  Venture,
  StudioProject,
  Client,
  FinanceSnapshot,
  AdminCompliance,
  WeeklyActivity,
  MustConquer,
  Win,
  AnnualGoal,
} from '../types';

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Zweli Ntshona',
    role: 'Founder & CEO',
    initials: 'ZN',
    color: '#4A3425',
    email: 'zweli@growthfarm.africa',
    roots: 'Mom from Eastern Cape, Dad from KZN',
    lifePurpose: 'Building generational wealth through African innovation',
    personalGoal2026: 'Complete first marathon',
    in20Years: 'Leading Africa\'s most impactful venture studio',
    mood: '🔥',
    moodText: 'Energized and focused',
    lastActive: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Albert',
    role: 'Chief of Staff',
    initials: 'AL',
    color: '#5C7A99',
    email: 'albert@growthfarm.africa',
    mood: '💪',
    moodText: 'Ready to execute',
    lastActive: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Brian Dube',
    role: 'CoS Associate',
    initials: 'BD',
    color: '#4A7C59',
    email: 'brian@growthfarm.africa',
    mood: '📊',
    moodText: 'Deep in data',
    lastActive: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Lindiwe',
    role: 'Fractional CFO',
    initials: 'LK',
    color: '#D4858D',
    email: 'lindiwe@growthfarm.africa',
    mood: '✅',
    moodText: 'Books balanced',
    lastActive: new Date().toISOString(),
  },
];

// Annual Goals
export const annualGoals: AnnualGoal[] = [
  {
    id: 1,
    title: 'R10M Studio Revenue',
    metric: 'R10,000,000 annual revenue',
    ownerId: 1,
    area: 'COMMUNITY_GROWTH',
  },
  {
    id: 2,
    title: 'Launch Mntase! (50K survey responses)',
    metric: '50,000 survey responses',
    ownerId: 1,
    area: 'NEW_FRONTIERS',
  },
  {
    id: 3,
    title: '3 Ventures Operational',
    metric: '3 ventures in LIVE or SCALING stage',
    ownerId: 1,
    area: 'IMPACT_DELIVERY',
  },
];

// BD Pipeline
export const bdDeals: BDDeal[] = [
  {
    id: 1,
    client: 'Nedbank',
    opportunity: 'Digital Design Sprint',
    value: 320000,
    stage: 'LEAD',
    expectedClose: '2026-03-15',
    ownerId: 1,
    notes: 'Initial meeting scheduled for next week',
  },
  {
    id: 2,
    client: 'Standard Bank',
    opportunity: 'UX Audit',
    value: 180000,
    stage: 'LEAD',
    expectedClose: '2026-02-28',
    ownerId: 2,
  },
  {
    id: 3,
    client: 'IBM',
    opportunity: 'Accelerator Programme',
    value: 400000,
    stage: 'DISCOVERY',
    expectedClose: '2026-02-03',
    ownerId: 1,
  },
  {
    id: 4,
    client: 'IFC',
    opportunity: 'Agriculture Advisory',
    value: 850000,
    stage: 'PROPOSAL',
    expectedClose: '2026-02-15',
    ownerId: 1,
    notes: 'Proposal submitted, awaiting feedback',
  },
  {
    id: 5,
    client: 'AGRA',
    opportunity: 'Phase 2 Trade Corridors',
    value: 620000,
    stage: 'PROPOSAL',
    expectedClose: '2026-02-10',
    ownerId: 2,
  },
  {
    id: 6,
    client: 'Vodacom',
    opportunity: 'Digital Transformation',
    value: 400000,
    stage: 'NEGOTIATION',
    expectedClose: '2026-01-31',
    ownerId: 1,
  },
  {
    id: 7,
    client: 'Gates Foundation',
    opportunity: 'R&D Strategy',
    value: 1200000,
    stage: 'WON',
    expectedClose: '2026-01-15',
    ownerId: 1,
  },
];

// Ventures
export const ventures: Venture[] = [
  {
    id: 1,
    name: 'Briansfomo',
    description: 'Curated gatherings platform',
    stage: 'MVP_BUILD',
    daysInStage: 23,
    targetDate: '2026-02-14',
    nextMilestone: 'Launch payment integration',
    ownerId: 3,
  },
  {
    id: 2,
    name: 'Mntase Communities',
    description: 'Student accommodation platform',
    stage: 'DISCOVERY',
    daysInStage: 45,
    nextMilestone: '50K survey responses',
    ownerId: 1,
  },
];

// Studio Projects
export const studioProjects: StudioProject[] = [
  {
    id: 1,
    project: 'R&D Strategy',
    client: 'Gates Foundation',
    hoursBudget: 160,
    hoursUsed: 142,
    rate: 7500,
    stage: 'IN_PROGRESS',
    dueDate: '2026-02-28',
    ownerId: 1,
  },
  {
    id: 2,
    project: 'Food Corridors',
    client: 'AGRA',
    hoursBudget: 120,
    hoursUsed: 68,
    rate: 5167,
    stage: 'IN_PROGRESS',
    dueDate: '2026-03-15',
    ownerId: 2,
  },
  {
    id: 3,
    project: 'Procurement System',
    client: 'VUT',
    hoursBudget: 40,
    hoursUsed: 52,
    rate: 4500,
    stage: 'IN_PROGRESS',
    dueDate: '2026-01-31',
    ownerId: 3,
    notes: 'Over budget - need scope discussion',
  },
];

// Clients
export const clients: Client[] = [
  {
    id: 1,
    clientName: 'Gates Foundation',
    contact: 'Sarah Johnson',
    status: 'FIRM',
    activeProjects: 2,
    ytdRevenue: 1200000,
    lastContact: '2026-01-28',
    relationshipOwnerId: 1,
  },
  {
    id: 2,
    clientName: 'AGRA',
    contact: 'John Mwangi',
    status: 'FIRM',
    activeProjects: 1,
    ytdRevenue: 620000,
    lastContact: '2026-01-25',
    relationshipOwnerId: 2,
  },
  {
    id: 3,
    clientName: 'VUT',
    contact: 'Prof. Molefe',
    status: 'ATTENTION',
    activeProjects: 1,
    ytdRevenue: 180000,
    lastContact: '2026-01-18',
    relationshipOwnerId: 3,
    notes: 'Project over budget - schedule meeting',
  },
  {
    id: 4,
    clientName: 'IBM',
    contact: 'Michael Chen',
    status: 'AT_RISK',
    activeProjects: 0,
    ytdRevenue: 0,
    lastContact: '2026-01-10',
    relationshipOwnerId: 1,
    notes: 'Pipeline only - need to close accelerator deal',
  },
];

// Finance
export const financeSnapshot: FinanceSnapshot = {
  id: 1,
  period: '2026-01',
  ytdRevenue: 1800000,
  annualRevenueTarget: 10000000,
  cashReserves: 412000,
  cashTarget: 500000,
  taxDebtOutstanding: 237000,
  taxMonthlyPaid: 50000,
  taxMonthlyTarget: 50000,
};

// Admin Compliance
export const adminCompliance: AdminCompliance[] = [
  {
    id: 1,
    item: 'Contractor Agreements',
    category: 'LEGAL',
    frequency: 'ONCE',
    dueDate: '2026-01-15',
    status: 'OVERDUE',
    ownerId: 2,
    notes: 'Need to finalize with 3 contractors',
  },
  {
    id: 2,
    item: 'VAT Return',
    category: 'TAX',
    frequency: 'MONTHLY',
    dueDate: '2026-01-25',
    status: 'PENDING',
    ownerId: 4,
  },
  {
    id: 3,
    item: 'Client MSAs (2)',
    category: 'LEGAL',
    frequency: 'ANNUAL',
    dueDate: '2026-02-01',
    status: 'PENDING',
    ownerId: 2,
    notes: 'Gates Foundation and AGRA MSAs expiring',
  },
  {
    id: 4,
    item: 'PAYE',
    category: 'TAX',
    frequency: 'MONTHLY',
    dueDate: '2026-01-07',
    status: 'DONE',
    ownerId: 4,
  },
  {
    id: 5,
    item: 'Provisional Tax',
    category: 'TAX',
    frequency: 'QUARTERLY',
    dueDate: '2026-01-31',
    status: 'DONE',
    ownerId: 4,
  },
  {
    id: 6,
    item: 'Bank Reconciliation',
    category: 'FINANCE',
    frequency: 'MONTHLY',
    dueDate: '2026-01-05',
    status: 'DONE',
    ownerId: 4,
  },
];

// Weekly Activities
export const weeklyActivities: WeeklyActivity[] = [
  {
    id: 1,
    description: 'Follow up IFC proposal',
    focusArea: 'COMMUNITY_GROWTH',
    monthlyGoalId: 1,
    dueDay: 'MON',
    ownerId: 1,
    status: 'DONE',
    outcomeNotes: 'Scheduled call for Wednesday',
  },
  {
    id: 2,
    description: 'Prepare IBM discovery deck',
    focusArea: 'COMMUNITY_GROWTH',
    monthlyGoalId: 1,
    dueDay: 'WED',
    ownerId: 1,
    status: 'PENDING',
  },
  {
    id: 3,
    description: 'Review Briansfomo payment integration',
    focusArea: 'NEW_FRONTIERS',
    monthlyGoalId: 2,
    dueDay: 'TUE',
    ownerId: 3,
    status: 'IN_PROGRESS',
  },
  {
    id: 4,
    description: 'Complete Gates R&D draft',
    focusArea: 'IMPACT_DELIVERY',
    monthlyGoalId: 3,
    dueDay: 'THU',
    ownerId: 1,
    status: 'PENDING',
  },
  {
    id: 5,
    description: 'Delegate VUT work to contractor',
    focusArea: 'IMPACT_DELIVERY',
    monthlyGoalId: 3,
    dueDay: 'MON',
    ownerId: 1,
    status: 'BLOCKED',
    outcomeNotes: 'Waiting on contractor agreements',
    dependencies: [2],
  },
  {
    id: 6,
    description: 'Review contractor agreements',
    focusArea: 'PURPOSE_PLATFORM',
    monthlyGoalId: 4,
    dueDay: 'TUE',
    ownerId: 2,
    status: 'PENDING',
  },
];

// Must Conquer
export const mustConquer: MustConquer[] = [
  {
    id: 1,
    title: 'Close Vodacom deal',
    linkedGoalId: 1,
    ralliedMemberIds: [1, 2],
  },
  {
    id: 2,
    title: 'Launch Briansfomo MVP',
    linkedGoalId: 2,
    ralliedMemberIds: [1, 3],
  },
  {
    id: 3,
    title: 'Fix VUT overrun',
    linkedGoalId: 3,
    ralliedMemberIds: [1, 2, 3],
  },
];

// Wins
export const wins: Win[] = [
  {
    id: 1,
    userId: 1,
    content: 'Closed Gates Foundation R&D Strategy - R1.2M!',
    createdAt: '2026-01-20T14:30:00Z',
    claps: 4,
    clapperIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    userId: 2,
    content: 'AGRA Food Corridors on track - 57% hours used',
    createdAt: '2026-01-22T09:15:00Z',
    claps: 2,
    clapperIds: [1, 3],
  },
];

// Helper functions
export function getTeamMember(id: number): TeamMember | undefined {
  return teamMembers.find(m => m.id === id);
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `R${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R${(value / 1000).toFixed(0)}K`;
  }
  return `R${value}`;
}

export function getDaysAgo(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function getTimeAgo(dateString: string): string {
  const days = getDaysAgo(dateString);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
