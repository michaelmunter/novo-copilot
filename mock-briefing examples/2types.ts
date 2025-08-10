// -----------------------------
// Shared Types
// -----------------------------

export type PayerMix = {
  payer: string // UI: horizontal bar chart with % label; sort desc
  percent: number // 0-100
}

export type TrendPoint = {
  date: string // ISO date (month granularity ok)
  value: number // UI: sparkline for quick glance; full line chart on expand
}

export type Coverage = {
  payer: string // UI: table columns = Payer | Tier | PA | ST | Co-pay | Notes
  tier: 'Preferred' | 'Non-Preferred' | 'Exclusion' | 'Open' | 'Unknown'
  priorAuth: boolean | 'Unknown'
  stepTherapy: boolean | 'Unknown'
  copay: string // e.g., "$25", "$75"; can be range
  notes?: string
}

export type DecisionMaker = {
  id: string
  name: string // UI: card with role chips and influence score badge
  role: string // e.g., "MD, Medical Director", "Pharmacy Director", "Buyer"
  department?: string
  seniority?: 'Staff' | 'Manager' | 'Director' | 'VP' | 'C-Suite'
  influenceScore: number // 0-100; UI: gauge/pill
  relationship: 'Advocate' | 'Neutral' | 'Skeptical' | 'Unknown' // UI: colored chip
  contactPrefs?: string[] // e.g., ["Email AM", "Phone Fri", "In-person only"]
  lastContact?: string // ISO date
  notes?: string
}

export type Interaction = {
  date: string // ISO
  channel: 'In-person' | 'Call' | 'Email' | 'Virtual'
  attendee?: string // who from the HCP side
  internalRep?: string // our rep
  summary: string // UI: collapsible timeline items; keep to 1-2 lines collapsed
  outcome?: 'Positive' | 'Neutral' | 'Negative' | 'Follow-up needed'
  attachments?: { name: string; type: 'pdf' | 'ppt' | 'link' }[]
}

export type Opportunity = {
  id: string
  name: string // UI: kanban card title
  product: string
  stage: 'Prospect' | 'Evaluate' | 'P&T' | 'Contract' | 'PO' | 'Live' | 'Lost'
  estCloseDate?: string
  amountUSD?: number
  probability?: number // 0-1
  nextAction?: string // UI: prominent action line
  owner?: string
  riskFlags?: string[] // UI: small red badges
}

export type Risk = {
  label: string // UI: bullet list with severity icon
  severity: 'Low' | 'Med' | 'High'
  note?: string
}

export type Geo = {
  lat: number
  lon: number
}

export type Address = {
  line1: string
  line2?: string
  city: string
  state: string // US state abbrev
  zip: string
}

export type ProductAccess = {
  product: string // UI: section header
  indications?: string[] // UI: inline tags
  accessByPayer: Coverage[] // UI: table as above
  icsCode?: string // internal catalogue/sku if relevant
  wac?: string // list price/WAC; UI: muted text
}

export type SalesSnapshot = {
  product: string
  last12moUnits: number
  last12moRevenueUSD: number
  yoyUnitsTrend: TrendPoint[] // UI: sparkline
  lastOrder?: { date: string; units: number; discount?: string }
}

export type VisitPlan = {
  meetingDate?: string // ISO; UI: sticky header "Today" if same day
  locationHint?: string // "Front desk check-in on 3rd floor"
  goals: string[] // UI: numbered list (max 3 visible)
  tailoredTalkTracks: string[] // UI: bullet chips
  suggestedQuestions: string[] // UI: bullet list
  likelyObjections: { objection: string; rebuttal: string }[] // UI: 2-col compact table
  leaveBehinds?: string[] // samples, brochures; UI: checkboxes
}

export type DataQuality = {
  asOf: string // ISO timestamp of AI generation
  crmSyncAsOf?: string // ISO timestamp of CRM extract
  gaps: string[] // UI: callouts titled "Unknowns to Clarify"
  confidenceNotes?: string[] // UI: muted bullet list
  restrictedFields?: string[] // UI: lock icon + tooltip
}

export type BriefingBase = {
  entityType: 'HCP' | 'HCO' // person vs organization
  entityId: string // opaque id from CRM
  displayName: string // UI: page title
  address: Address
  geo?: Geo // UI: small map/directions button
  phone?: string
  email?: string // may be masked
  territory?: string // e.g., "NY-North"
  segmentTier?: 'A' | 'B' | 'C' // UI: colored tag
  specialties?: string[] // cards or tags
  ehr?: string // EHR vendor; UI: small tag
  languages?: string[] // tags
  officeHours?: { day: string; open: string; close: string }[] // UI: simple table
  staffCount?: number // for practices; UI: stat card
  patientPanelSize?: number // for HCPs/practices; UI: stat card
  payerMix?: PayerMix[] // bar chart
  topDiagnoses?: { code: string; label: string; percent: number }[] // small table
  topProcedures?: { code: string; label: string; last12mo: number }[] // small table
  services?: string[] // tags
  affiliations?: { name: string; role?: string }[] // bullets
  decisionMakers: DecisionMaker[] // cards
  recentInteractions: Interaction[] // timeline
  sales: SalesSnapshot[] // product cards with sparkline
  access: ProductAccess[] // per product tables
  opportunities?: Opportunity[] // kanban
  risks?: Risk[] // bullets with severity icons
  compliance?: { doNotCall?: boolean; sampleEligible?: boolean; notes?: string }
  visitPlan: VisitPlan // goals, talk tracks, objections
  dataQuality: DataQuality // freshness + gaps
}
