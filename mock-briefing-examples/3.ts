/**
 * Compact, laptop-friendly AI Briefing mocks + support for user-defined custom fields (prompt injection per account).
 *
 * Focus: one-screen briefing with light scroll. Mirrors CRM Overview sections, but condensed.
 * Includes "custom prompt fields" so a user can add their own AI cards without a chat UI.
 */

// -----------------------------
// Types
// -----------------------------

export type Id = string

export type CompactHeader = {
  entityId: Id
  name: string // UI: H1 + segment chip
  segmentTier: 'A' | 'B' | 'C'
  kind: 'Private Practice' | 'Hospital/Health System'
  specialties?: string[] // tags
  city: string
  state: string
  phone?: string
  ehr?: string // tag
  meeting?: { whenISO: string; locationHint?: string } // sticky pill
  quickStats?: { label: string; value: string }[] // e.g., Patients, Staff, Beds
  lastSyncISO?: string // small muted text
}

export type Essentials = {
  goal: string // UI: bold bullet 1
  ask: string // UI: bold bullet 2
  risk: string // UI: bold bullet 3 (warning color)
  tactic: string // UI: muted caption under bullets
}

export type AccessSnapshot = {
  product: string // section header
  rows: { payer: string; status: '✅' | '⚠' | '❓'; note?: string }[] // UI: 3-column compact list
}

export type SalesCompact = {
  product: string
  last12moUnits: number
  lastOrder?: { date: string; units: number; discount?: string }
  spark: { date: string; value: number }[] // UI: tiny sparkline
}

export type DecisionMini = {
  name: string
  role: string
  stance: 'Advocate' | 'Neutral' | 'Skeptical' | 'Unknown'
  influence: number // 0-100 badge
}

export type NextSteps = string[] // UI: numbered, max 3 lines

export type DataGaps = string[] // UI: callout list

// -----------------------------
// Custom Prompt Fields (User-added AI cards)
// -----------------------------

/**
 * A user creates a lightweight, reusable prompt that is appended to the model instruction chain for this entity.
 * The output is rendered as a compact card in the briefing.
 *
 * UX: Click "+ Add Field" → modal with: Title, Prompt (textarea), Optional data scope (e.g., product/payer/role).
 * The backend stores the prompt; on generation, AI returns a short summary + references into the CRM payload.
 */
export type CustomFieldDefinition = {
  id: Id
  title: string // UI: card title
  prompt: string // stored and appended to system/context prompts
  scope?: { product?: string; payer?: string; role?: string }
  createdBy: string // user id/email
  createdAtISO: string
}

export type CustomFieldResult = {
  fieldId: Id // link to definition
  title: string // identical to definition at render time
  aiSummary: string // 1-3 lines, opinionated result
  dataRefs?: string[] // cross-links, e.g., ['access.NovoGlucoXR.Aetna', 'sales.NovoGlucoXR.trend']
  updatedAtISO: string
}

export type CompactBriefing = {
  header: CompactHeader
  essentials: Essentials
  access: AccessSnapshot[] // usually 1-2 products
  sales: SalesCompact[] // 1-2 products
  decisionMakers: DecisionMini[] // 2-3 people
  nextSteps: NextSteps // 3 items
  dataGaps: DataGaps // 2-3 items
  // Custom fields (computed by LLM at generation time using stored definitions)
  customFieldResults?: CustomFieldResult[]
  // For UI rendering hints
  _ui?: {
    // where to place custom fields; default 'after-essentials'
    customFieldsPlacement?:
      | 'after-essentials'
      | 'after-access'
      | 'after-sales'
      | 'final'
  }
}

// -----------------------------
// UI Presentation Notes (for both examples)
// -----------------------------
/**
 * Layout: single column, max width ~1100px, sections as dense cards. Light scroll only.
 * 1) Header (sticky mini bar with name + meeting pill on scroll)
 * 2) Essentials (3 bullets + tactic caption)
 * 3) Custom Fields (if any) — two cards side-by-side if space allows
 * 4) Access (2 compact lists)
 * 5) Sales (2 product mini-cards with sparklines)
 * 6) Decision Makers (3 chips/cards)
 * 7) Next Steps (numbered)
 * 8) Data Gaps (callouts)
 */

// -----------------------------
// Example: Small Private Practice (Condensed)
// -----------------------------

export const compactPrivatePractice: CompactBriefing = {
  header: {
    entityId: 'hcp:pp:84721',
    name: 'North Shore Family Care, PLLC',
    segmentTier: 'A',
    kind: 'Private Practice',
    specialties: ['Family Medicine', 'Primary Care'],
    city: 'Buffalo',
    state: 'NY',
    phone: '(716) 555-0149',
    ehr: 'Epic Community Connect',
    meeting: {
      whenISO: '2025-08-12T10:00:00-04:00',
      locationHint: 'Suite 200, parking behind building',
    },
    quickStats: [
      { label: 'Patients', value: '≈5,600' },
      { label: 'Staff', value: '14' },
      { label: 'Lang', value: 'EN/ES' },
    ],
    lastSyncISO: '2025-08-08T23:10:00Z',
  },
  essentials: {
    goal: 'Confirm 10-patient NovoGluco XR pilot outcomes',
    ask: 'Agree on PA workflow + stock starter packs',
    risk: 'Aetna PA burden; high Medicaid share → price sensitivity',
    tactic:
      'Lead with once-daily adherence + PA auto-approval data; offer patient assistance.',
  },
  access: [
    {
      product: 'NovoGluco XR 500 mg',
      rows: [
        { payer: 'Medicare', status: '✅' },
        { payer: 'BCBS', status: '✅' },
        { payer: 'Aetna', status: '⚠', note: 'PA required' },
        { payer: 'Medicaid', status: '✅', note: 'ST after metformin IR' },
        { payer: 'UHC', status: '❓', note: 'Unknown' },
      ],
    },
    {
      product: 'NovoCardia ACE 10 mg',
      rows: [
        { payer: 'Medicare', status: '✅' },
        { payer: 'BCBS', status: '✅' },
        { payer: 'Aetna', status: '✅' },
      ],
    },
  ],
  sales: [
    {
      product: 'NovoGluco XR 500 mg',
      last12moUnits: 1280,
      lastOrder: { date: '2025-07-24', units: 120, discount: '2%' },
      spark: [
        { date: '2024-08-01', value: 72 },
        { date: '2024-11-01', value: 90 },
        { date: '2025-02-01', value: 106 },
        { date: '2025-05-01', value: 118 },
      ],
    },
    {
      product: 'NovoCardia ACE 10 mg',
      last12moUnits: 620,
      lastOrder: { date: '2025-06-29', units: 60 },
      spark: [
        { date: '2024-08-01', value: 35 },
        { date: '2025-02-01', value: 48 },
        { date: '2025-05-01', value: 52 },
      ],
    },
  ],
  decisionMakers: [
    {
      name: 'Ariana Patel, MD',
      role: 'Medical Director',
      stance: 'Advocate',
      influence: 88,
    },
    {
      name: 'Shawn Li',
      role: 'Practice Manager',
      stance: 'Neutral',
      influence: 71,
    },
  ],
  nextSteps: [
    'Review pilot outcomes together',
    'Finalize PA form workflow (esp. Aetna)',
    'Confirm starter pack storage & reorder process',
  ],
  dataGaps: ['UHC coverage specifics', '2025 flu vaccine order plan'],
  customFieldResults: [
    {
      fieldId: 'cf-pp-1',
      title: 'Adherence Lift Projection',
      aiSummary:
        'Based on payer mix + once-daily dosing, expected 6–9% 90-day persistence lift if PA friction reduced.',
      dataRefs: [
        'payerMix.Medicaid',
        'access.NovoGlucoXR.Aetna',
        'sales.NovoGlucoXR.trend',
      ],
      updatedAtISO: '2025-08-09T07:45:00Z',
    },
    {
      fieldId: 'cf-pp-2',
      title: 'Staff Workflow Impact',
      aiSummary:
        'PA checklist + EHR smart phrase likely reduces call-backs ~60%; prioritize training MA team.',
      dataRefs: ['interactions.2025-06-13', 'access.NovoGlucoXR.Aetna'],
      updatedAtISO: '2025-08-09T07:45:00Z',
    },
  ],
  _ui: { customFieldsPlacement: 'after-essentials' },
}

// Example saved custom field definitions for this practice (what the user created via "+ Add Field")
export const customFieldDefsForPractice: CustomFieldDefinition[] = [
  {
    id: 'cf-pp-1',
    title: 'Adherence Lift Projection',
    prompt:
      'Estimate expected 90-day persistence lift if prior auth steps are streamlined for the main payers in this clinic. Keep to 2 sentences with a % range and the key lever.',
    scope: { product: 'NovoGluco XR 500 mg' },
    createdBy: 'rep@mco.com',
    createdAtISO: '2025-08-08T10:12:00Z',
  },
  {
    id: 'cf-pp-2',
    title: 'Staff Workflow Impact',
    prompt:
      'From interactions + access notes, summarize operational time-savers for the practice staff. Focus on PA templates, training, and call reduction.',
    createdBy: 'rep@mco.com',
    createdAtISO: '2025-08-08T10:15:00Z',
  },
]

// -----------------------------
// Example: Hospital / Health System (Condensed)
// -----------------------------

export const compactHospital: CompactBriefing = {
  header: {
    entityId: 'hco:hospital:33901',
    name: 'Great Lakes University Hospital',
    segmentTier: 'A',
    kind: 'Hospital/Health System',
    specialties: ['Cardiology', 'Endocrinology', 'Emergency Medicine'],
    city: 'Cleveland',
    state: 'OH',
    phone: '(216) 555-0198',
    ehr: 'Epic',
    meeting: {
      whenISO: '2025-08-14T14:30:00-04:00',
      locationHint: 'Pharmacy conference room, Tower B (badge required)',
    },
    quickStats: [
      { label: 'Staff', value: '4,200' },
      { label: '340B', value: 'Yes' },
      { label: 'IDN', value: 'Great Lakes Health System' },
    ],
    lastSyncISO: '2025-08-08T22:55:00Z',
  },
  essentials: {
    goal: 'Secure P&T endorsement for post-MI order set (NovoCardia ACE)',
    ask: 'Align GPO/contract path; confirm outcomes tracking plan',
    risk: 'Budget pressure FY25; P&T backlog may slip decision',
    tactic:
      'Lead with budget-neutral protocol swap + 30-day readmit reduction signals.',
  },
  access: [
    {
      product: 'NovoCardia ACE 10 mg',
      rows: [
        { payer: 'Medicare', status: '✅' },
        { payer: 'BCBS', status: '✅' },
        { payer: 'UHC', status: '⚠', note: 'PA required' },
        { payer: 'Aetna', status: '✅' },
        { payer: 'Medicaid', status: '✅', note: 'ST possible' },
      ],
    },
    {
      product: 'NovoGluco XR 500 mg',
      rows: [
        { payer: 'Medicare', status: '✅' },
        { payer: 'BCBS', status: '✅' },
        { payer: 'Cigna', status: '✅' },
        { payer: 'UHC', status: '❓', note: 'Unknown' },
      ],
    },
  ],
  sales: [
    {
      product: 'NovoCardia ACE 10 mg',
      last12moUnits: 18200,
      lastOrder: { date: '2025-07-28', units: 1600, discount: '4%' },
      spark: [
        { date: '2024-08-01', value: 1120 },
        { date: '2025-02-01', value: 1540 },
        { date: '2025-05-01', value: 1690 },
      ],
    },
    {
      product: 'NovoGluco XR 500 mg',
      last12moUnits: 9800,
      lastOrder: { date: '2025-07-19', units: 900 },
      spark: [
        { date: '2024-08-01', value: 620 },
        { date: '2025-02-01', value: 820 },
        { date: '2025-05-01', value: 940 },
      ],
    },
  ],
  decisionMakers: [
    {
      name: 'Marta Nguyen, PharmD',
      role: 'Pharmacy Director',
      stance: 'Neutral',
      influence: 90,
    },
    {
      name: 'Daniel O’Connor, MD',
      role: 'Cardiology Chief',
      stance: 'Advocate',
      influence: 84,
    },
    {
      name: 'Sara James',
      role: 'Materials Mgmt Buyer',
      stance: 'Skeptical',
      influence: 68,
    },
  ],
  nextSteps: [
    'Submit 3-yr BIA sensitivity by Aug 20',
    'Align on GPO contract path with Materials Mgmt',
    'Prepare pharmacist education + order set mockup',
  ],
  dataGaps: ['UHC coverage details', 'Exact next P&T meeting date'],
  customFieldResults: [
    {
      fieldId: 'cf-h-1',
      title: 'Budget-Neutral Scenario Check',
      aiSummary:
        'Protocol substitution keeps net drug spend flat year 1 at current case mix; sensitivity ±3% under low-adoption.',
      dataRefs: ['sales.NovoCardiaACE.trend', 'access.NovoCardiaACE.UHC'],
      updatedAtISO: '2025-08-09T07:45:00Z',
    },
    {
      fieldId: 'cf-h-2',
      title: 'Readmit Risk Impact',
      aiSummary:
        'If post-MI ACE inclusion improves adherence by 5–7%, projected 30-day readmits drop ~0.3–0.5 pp.',
      dataRefs: ['diagnoses.NSTEMI', 'protocols.postMI'],
      updatedAtISO: '2025-08-09T07:45:00Z',
    },
  ],
  _ui: { customFieldsPlacement: 'after-essentials' },
}

// Example saved custom field definitions for this hospital
export const customFieldDefsForHospital: CustomFieldDefinition[] = [
  {
    id: 'cf-h-1',
    title: 'Budget-Neutral Scenario Check',
    prompt:
      'Given current post-MI protocol and payer mix, assess whether adding our ACE can be budget-neutral in year 1. Output a single sentence with a yes/no and the main assumption.',
    scope: { product: 'NovoCardia ACE 10 mg' },
    createdBy: 'rep@mco.com',
    createdAtISO: '2025-08-08T09:01:00Z',
  },
  {
    id: 'cf-h-2',
    title: 'Readmit Risk Impact',
    prompt:
      'Estimate change in 30-day readmission rate if ACE adherence improves by 5–7%. Keep to one sentence and include range.',
    scope: { role: 'Cardiology' },
    createdBy: 'rep@mco.com',
    createdAtISO: '2025-08-08T09:03:00Z',
  },
]

// -----------------------------
// Minimal rendering helpers (optional)
// -----------------------------

export const hasCustomFields = (b: CompactBriefing) =>
  (b.customFieldResults?.length ?? 0) > 0
export const topDecisionMakers = (b: CompactBriefing) =>
  [...(b.decisionMakers || [])]
    .sort((a, b2) => b2.influence - a.influence)
    .slice(0, 3)
