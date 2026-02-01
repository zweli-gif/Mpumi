// Focus Areas (matches the 5 nomenclature areas)
export type FocusArea =
  | 'COMMUNITY_GROWTH'    // BD & Marketing
  | 'IMPACT_DELIVERY'     // Client Projects
  | 'NEW_FRONTIERS'       // Ventures
  | 'STEWARDSHIP'         // Finance
  | 'PURPOSE_PLATFORM';   // Admin & Ops

// Team Member
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  email: string;
  roots?: string;
  lifePurpose?: string;
  personalGoal2026?: string;
  in20Years?: string;
  mood?: string;
  moodText?: string;
  lastActive?: string;
}

// Annual Goal
export interface AnnualGoal {
  id: number;
  title: string;
  metric: string;
  ownerId: number;
  area: FocusArea;
  monthlyTargets?: (number | null)[];
}

// Monthly Goal
export interface MonthlyGoal {
  id: number;
  annualGoalId: number;
  month: number;
  target: number;
  actual: number;
  status: 'ON_TRACK' | 'ATTENTION' | 'AT_RISK';
}

// Weekly Activity
export interface WeeklyActivity {
  id: number;
  description: string;
  focusArea: FocusArea;
  monthlyGoalId: number;
  dueDay: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  ownerId: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED';
  outcomeNotes?: string;
  driveLink?: string;
  dependencies?: number[];
  accountabilityPartnerId?: number;
}

// BD Pipeline Deal
export type BDStage = 'LEAD' | 'DISCOVERY' | 'PROPOSAL' | 'NEGOTIATION' | 'CONTRACTING' | 'WON' | 'LOST';

export interface BDDeal {
  id: number;
  client: string;
  opportunity: string;
  value: number;
  stage: BDStage;
  expectedClose: string;
  ownerId: number;
  notes?: string;
  lossReason?: string;
  driveLink?: string;
}

// Stage probabilities for weighted pipeline
export const BD_STAGE_PROBABILITY: Record<BDStage, number> = {
  LEAD: 0.10,
  DISCOVERY: 0.40,
  PROPOSAL: 0.60,
  NEGOTIATION: 0.80,
  CONTRACTING: 0.90,
  WON: 1.00,
  LOST: 0.00,
};

// Venture
export type VentureStage = 'IDEA_DUMP' | 'CONCEPT' | 'DISCOVERY' | 'MVP_BUILD' | 'PILOT' | 'LIVE' | 'SCALING';

export interface Venture {
  id: number;
  name: string;
  description: string;
  stage: VentureStage;
  daysInStage: number;
  targetDate?: string;
  nextMilestone?: string;
  blockers?: string;
  ownerId: number;
  links?: string[];
}

// Studio Project
export type StudioStage = 'SCOPING' | 'CONTRACTED' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETE' | 'CLOSED';

export interface StudioProject {
  id: number;
  project: string;
  client: string;
  hoursBudget: number;
  hoursUsed: number;
  rate: number;
  stage: StudioStage;
  startDate?: string;
  dueDate?: string;
  ownerId: number;
  notes?: string;
  driveLink?: string;
}

// Client Health
export type ClientStatus = 'FIRM' | 'ATTENTION' | 'AT_RISK' | 'DORMANT';

export interface Client {
  id: number;
  clientName: string;
  contact: string;
  status: ClientStatus;
  activeProjects: number;
  ytdRevenue: number;
  lastContact: string;
  relationshipOwnerId: number;
  notes?: string;
}

// Finance Snapshot
export interface FinanceSnapshot {
  id: number;
  period: string;
  ytdRevenue: number;
  annualRevenueTarget: number;
  cashReserves: number;
  cashTarget: number;
  taxDebtOutstanding: number;
  taxMonthlyPaid: number;
  taxMonthlyTarget: number;
}

// Admin Compliance
export type ComplianceCategory = 'LEGAL' | 'FINANCE' | 'HR' | 'TAX' | 'OTHER';
export type ComplianceFrequency = 'ONCE' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
export type ComplianceStatus = 'DONE' | 'PENDING' | 'OVERDUE';

export interface AdminCompliance {
  id: number;
  item: string;
  category: ComplianceCategory;
  frequency: ComplianceFrequency;
  dueDate: string;
  status: ComplianceStatus;
  ownerId: number;
  notes?: string;
}

// Must Conquer Item
export interface MustConquer {
  id: number;
  title: string;
  linkedGoalId?: number;
  ralliedMemberIds: number[];
}

// Top of Mind
export interface TopOfMind {
  userId: number;
  content: string;
  lastUpdated: string;
}

// Win from Last Week
export interface Win {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  claps: number;
  clapperIds: number[];
}

// Navigation routes
export type NavigationRoute = 'farmstead' | 'health' | 'operations' | 'monthly' | 'weekly';

// Operations popup area
export interface OperationsArea {
  id: string;
  nomenclature: string;
  traditional: string;
  icon: string;
  focusArea: FocusArea | 'THE_FAMILY';
  route: string;
}
