import type { BriefingBase } from './2types'

// -----------------------------
// Scenario 1: Small Private Practice (Family Medicine)
// -----------------------------

export const mockPrivatePracticeBriefing: BriefingBase = {
  entityType: 'HCO',
  entityId: 'hcp:pp:84721',
  displayName: 'North Shore Family Care, PLLC', // UI: title + segmentTier chip
  address: {
    line1: '1257 Maple Ave',
    city: 'Buffalo',
    state: 'NY',
    zip: '14216',
  },
  geo: { lat: 42.9479, lon: -78.8662 },
  phone: '(716) 555-0149',
  territory: 'NY-North',
  segmentTier: 'A',
  specialties: ['Family Medicine', 'Primary Care'],
  ehr: 'Epic Community Connect',
  languages: ['English', 'Spanish'],
  officeHours: [
    { day: 'Mon', open: '08:00', close: '17:00' },
    { day: 'Tue', open: '08:00', close: '17:00' },
    { day: 'Wed', open: '08:00', close: '17:00' },
    { day: 'Thu', open: '08:00', close: '17:00' },
    { day: 'Fri', open: '08:00', close: '15:00' },
  ], // UI: compact table; highlight current day
  staffCount: 14, // UI: stat card
  patientPanelSize: 5600, // UI: stat card labeled "Active patients"
  payerMix: [
    { payer: 'Medicare', percent: 31 },
    { payer: 'Medicaid', percent: 22 },
    { payer: 'BCBS', percent: 28 },
    { payer: 'Aetna', percent: 9 },
    { payer: 'UnitedHealthcare', percent: 7 },
    { payer: 'Self-pay', percent: 3 },
  ], // UI: horizontal bars; show top 5, collapse rest
  topDiagnoses: [
    {
      code: 'E11.9',
      label: 'Type 2 diabetes mellitus (no complications)',
      percent: 12.4,
    },
    { code: 'I10', label: 'Essential (primary) hypertension', percent: 18.1 },
    { code: 'E78.5', label: 'Hyperlipidemia, unspecified', percent: 9.7 },
    { code: 'F41.1', label: 'Generalized anxiety disorder', percent: 4.9 },
  ], // UI: 2-col table with %
  topProcedures: [
    { code: '83036', label: 'Hemoglobin A1c test', last12mo: 1180 },
    {
      code: '99213',
      label: 'Office visit, established patient',
      last12mo: 3920,
    },
    { code: '90686', label: 'Influenza vaccine, quadrivalent', last12mo: 970 },
  ], // UI: small table with last 12 mo counts
  services: [
    'Same-day sick visits',
    'Telehealth',
    'Chronic care management',
    'Vaccinations',
  ], // UI: tags
  affiliations: [
    { name: 'Buffalo General Medical Center', role: 'Admitting privileges' },
    { name: 'North Buffalo ASC', role: 'Procedures' },
  ], // UI: bulleted list

  decisionMakers: [
    {
      id: 'dm-pp-1',
      name: 'Ariana Patel, MD',
      role: 'Medical Director',
      department: 'Clinical',
      seniority: 'Director',
      influenceScore: 88,
      relationship: 'Advocate',
      contactPrefs: ['Email (AM)', 'In-person'],
      lastContact: '2025-07-22',
      notes: 'Prefers outcome data and patient adherence tips.',
    },
    {
      id: 'dm-pp-2',
      name: 'Shawn Li',
      role: 'Practice Manager',
      department: 'Operations',
      seniority: 'Manager',
      influenceScore: 71,
      relationship: 'Neutral',
      contactPrefs: ['Phone (Fri)', 'Email'],
      lastContact: '2025-07-10',
      notes: 'Cost sensitivity; concerned about prior auth burden.',
    },
  ],

  recentInteractions: [
    {
      date: '2025-07-22',
      channel: 'In-person',
      attendee: 'Dr. Patel',
      internalRep: 'J. Morris',
      summary: 'Reviewed new T2D titration guide; agreed to pilot 10 patients.',
      outcome: 'Positive',
      attachments: [{ name: 'T2D_Titration_Guide.pdf', type: 'pdf' }],
    },
    {
      date: '2025-06-13',
      channel: 'Email',
      attendee: 'Shawn Li',
      internalRep: 'J. Morris',
      summary: 'Sent coverage summary by payer; requested PA forms.',
      outcome: 'Follow-up needed',
    },
  ], // UI: reverse-chron timeline

  sales: [
    {
      product: 'NovoGluco XR 500 mg',
      last12moUnits: 1280,
      last12moRevenueUSD: 38400,
      yoyUnitsTrend: [
        { date: '2024-08-01', value: 72 },
        { date: '2024-11-01', value: 90 },
        { date: '2025-02-01', value: 106 },
        { date: '2025-05-01', value: 118 },
      ],
      lastOrder: { date: '2025-07-24', units: 120, discount: '2%' },
    },
    {
      product: 'NovoCardia ACE 10 mg',
      last12moUnits: 620,
      last12moRevenueUSD: 17360,
      yoyUnitsTrend: [
        { date: '2024-08-01', value: 35 },
        { date: '2025-02-01', value: 48 },
        { date: '2025-05-01', value: 52 },
      ],
      lastOrder: { date: '2025-06-29', units: 60 },
    },
  ], // UI: product cards, sparkline mini-chart + last order pill

  access: [
    {
      product: 'NovoGluco XR 500 mg',
      indications: ['Type 2 Diabetes (adults)'],
      icsCode: 'NGX500',
      wac: '$30 / 60 tabs',
      accessByPayer: [
        {
          payer: 'Medicare',
          tier: 'Open',
          priorAuth: false,
          stepTherapy: false,
          copay: '$10',
        },
        {
          payer: 'BCBS',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$20',
        },
        {
          payer: 'Aetna',
          tier: 'Non-Preferred',
          priorAuth: true,
          stepTherapy: false,
          copay: '$45',
          notes: 'PA for new starts',
        },
        {
          payer: 'Medicaid',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: true,
          copay: '$3',
          notes: 'ST after metformin IR',
        },
        {
          payer: 'UnitedHealthcare',
          tier: 'Unknown',
          priorAuth: 'Unknown',
          stepTherapy: 'Unknown',
          copay: '—',
        },
      ],
    },
    {
      product: 'NovoCardia ACE 10 mg',
      indications: ['Hypertension (adults)'],
      accessByPayer: [
        {
          payer: 'Medicare',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$5',
        },
        {
          payer: 'BCBS',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$15',
        },
        {
          payer: 'Aetna',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$10',
        },
      ],
    },
  ], // UI: table per product; highlight unknowns

  opportunities: [
    {
      id: 'opp-pp-1',
      name: 'Chronic Care Pathway bundle',
      product: 'NovoGluco XR 500 mg',
      stage: 'Evaluate',
      estCloseDate: '2025-09-15',
      amountUSD: 18000,
      probability: 0.55,
      nextAction:
        'Schedule results review of 10-patient pilot (week of Aug 18).',
      owner: 'J. Morris',
      riskFlags: ['Prior auth friction (Aetna)'],
    },
  ], // UI: simple kanban column

  risks: [
    { label: 'Staff turnover impacting medication refills', severity: 'Med' },
    { label: 'High Medicaid share—price sensitivity', severity: 'Med' },
  ], // UI: bullets with color-coded dots

  compliance: { doNotCall: false, sampleEligible: true },

  visitPlan: {
    meetingDate: '2025-08-12T10:00:00-04:00',
    locationHint: 'Front desk, Suite 200; parking behind building.',
    goals: [
      'Confirm outcomes from 10-patient NovoGluco XR pilot',
      'Agree PA workflow to reduce callbacks',
      'Secure commitment to stock starter packs',
    ],
    tailoredTalkTracks: [
      'Improved adherence with once-daily XR',
      'Local payer PA auto-approval rates after complete documentation',
      'Patient assistance for underinsured',
    ],
    suggestedQuestions: [
      'Which payers generate the most PA denials for T2D?',
      'Who final-signs on adding to clinic order set?',
      'Any staff training gaps on titration?',
    ],
    likelyObjections: [
      {
        objection: 'Worried about PA time',
        rebuttal: 'Pre-filled forms + EHR smart phrase reduce time by ~60%.',
      },
      {
        objection: 'Patients prefer current med',
        rebuttal: 'Share real-world persistence data + co-pay coupons.',
      },
    ],
    leaveBehinds: [
      'Titration guide (laminated)',
      'PA checklist',
      'Starter pack request form',
    ],
  }, // UI: checklist + 3-goal focus

  dataQuality: {
    asOf: '2025-08-09T07:45:00Z',
    crmSyncAsOf: '2025-08-08T23:10:00Z',
    gaps: [
      'Unknown UHC coverage specifics—confirm at visit',
      'No data on 2025 flu vaccine order plan',
    ],
    confidenceNotes: ['Payer mix based on 12-mo claims sample (±3%)'],
    restrictedFields: ['Patient-level identifiers (masked)'],
  },
}

// -----------------------------
// Scenario 2: Hospital / Health System (Regional Teaching Hospital)
// -----------------------------

export const mockHospitalBriefing: BriefingBase = {
  entityType: 'HCO',
  entityId: 'hco:hospital:33901',
  displayName: 'Great Lakes University Hospital',
  address: {
    line1: '1 University Medical Ctr',
    city: 'Cleveland',
    state: 'OH',
    zip: '44106',
  },
  geo: { lat: 41.504, lon: -81.611 },
  phone: '(216) 555-0198',
  territory: 'OH-East',
  segmentTier: 'A',
  specialties: [
    'Internal Medicine',
    'Endocrinology',
    'Cardiology',
    'Emergency Medicine',
  ],
  ehr: 'Epic',
  services: [
    'Level I Trauma',
    'Endocrinology Clinic',
    'Cardiac Cath Lab',
    'Outpatient Pharmacy (340B)',
    'Diabetes Education Program',
  ], // UI: multi-line tag grid
  affiliations: [
    { name: 'Great Lakes Health System', role: 'IDN parent' },
    { name: "Lakeside Children's", role: 'Pediatric affiliate' },
  ],

  // Hospital-specific operational stats
  staffCount: 4200, // UI: stat card "Employees"
  patientPanelSize: 0, // not meaningful—hide if 0
  payerMix: [
    { payer: 'Medicare', percent: 38 },
    { payer: 'Medicaid', percent: 24 },
    { payer: 'BCBS', percent: 20 },
    { payer: 'UnitedHealthcare', percent: 9 },
    { payer: 'Aetna', percent: 5 },
    { payer: 'Cigna', percent: 3 },
    { payer: 'Self-pay/Other', percent: 1 },
  ],
  topDiagnoses: [
    {
      code: 'E11.65',
      label: 'Type 2 diabetes with hyperglycemia',
      percent: 6.2,
    },
    { code: 'I21.4', label: 'NSTEMI', percent: 2.1 },
    { code: 'I50.9', label: 'Heart failure, unspecified', percent: 3.8 },
  ], // UI: concise table, show inpatient/outpatient toggle if available
  topProcedures: [
    { code: '92928', label: 'PCI with stent placement', last12mo: 740 },
    { code: '99232', label: 'Subsequent hospital care', last12mo: 18200 },
    {
      code: 'G0108',
      label: 'Diabetes self-management training, individual',
      last12mo: 860,
    },
  ],

  decisionMakers: [
    {
      id: 'dm-h-1',
      name: 'Marta Nguyen, PharmD',
      role: 'Pharmacy Director',
      department: 'Pharmacy',
      seniority: 'Director',
      influenceScore: 90,
      relationship: 'Neutral',
      contactPrefs: ['Email', 'P&T packet 2 weeks pre-meeting'],
      lastContact: '2025-07-18',
      notes: 'Focus on formulary budget impact and med-use policy.',
    },
    {
      id: 'dm-h-2',
      name: 'Daniel O’Connor, MD',
      role: 'Cardiology Section Chief',
      department: 'Cardiology',
      seniority: 'Director',
      influenceScore: 84,
      relationship: 'Advocate',
      contactPrefs: ['In-person', 'Case data'],
      lastContact: '2025-07-30',
      notes: 'Interested in real-world outcomes in older adults.',
    },
    {
      id: 'dm-h-3',
      name: 'Sara James',
      role: 'Materials Management Buyer',
      department: 'Supply Chain',
      seniority: 'Manager',
      influenceScore: 68,
      relationship: 'Skeptical',
      contactPrefs: ['Email', 'RFP portal only'],
      lastContact: '2025-06-20',
      notes: 'Strict on contract terms; requires GPO alignment.',
    },
  ], // UI: card list with role/color chips

  recentInteractions: [
    {
      date: '2025-07-30',
      channel: 'In-person',
      attendee: 'Dr. O’Connor',
      internalRep: 'L. Perez',
      summary:
        'Reviewed post-MI protocol update; requested inclusion of NovoCardia ACE as option.',
      outcome: 'Positive',
      attachments: [{ name: 'Post_MI_Protocol_Draft_v3.ppt', type: 'ppt' }],
    },
    {
      date: '2025-07-18',
      channel: 'Virtual',
      attendee: 'Marta Nguyen, PharmD',
      internalRep: 'L. Perez',
      summary:
        'Discussed formulary budget impact model; asked for 3-year sensitivity analysis.',
      outcome: 'Follow-up needed',
      attachments: [{ name: 'BIA_Model.xlsx', type: 'link' }],
    },
    {
      date: '2025-06-20',
      channel: 'Email',
      attendee: 'Sara James',
      internalRep: 'Contracts Ops',
      summary: 'RFP timeline shared; requires GPO contract ID prior to PO.',
      outcome: 'Neutral',
    },
  ], // UI: timeline with filter by role/department

  sales: [
    {
      product: 'NovoCardia ACE 10 mg',
      last12moUnits: 18200,
      last12moRevenueUSD: 509600,
      yoyUnitsTrend: [
        { date: '2024-08-01', value: 1120 },
        { date: '2025-02-01', value: 1540 },
        { date: '2025-05-01', value: 1690 },
      ],
      lastOrder: { date: '2025-07-28', units: 1600, discount: '4%' },
    },
    {
      product: 'NovoGluco XR 500 mg',
      last12moUnits: 9800,
      last12moRevenueUSD: 294000,
      yoyUnitsTrend: [
        { date: '2024-08-01', value: 620 },
        { date: '2025-02-01', value: 820 },
        { date: '2025-05-01', value: 940 },
      ],
      lastOrder: { date: '2025-07-19', units: 900 },
    },
  ], // UI: product cards in grid; click-through to dept breakdowns if available

  access: [
    {
      product: 'NovoCardia ACE 10 mg',
      indications: ['Hypertension (adults)', 'Post-MI management'],
      wac: '$28 / 60 tabs',
      accessByPayer: [
        {
          payer: 'Medicare',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$5',
        },
        {
          payer: 'BCBS',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$15',
        },
        {
          payer: 'UnitedHealthcare',
          tier: 'Non-Preferred',
          priorAuth: true,
          stepTherapy: false,
          copay: '$40',
        },
        {
          payer: 'Aetna',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$10',
        },
        {
          payer: 'Medicaid',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: true,
          copay: '$3',
          notes: 'ST after ACE class failure',
        },
      ],
    },
    {
      product: 'NovoGluco XR 500 mg',
      indications: ['Type 2 Diabetes (adults)'],
      accessByPayer: [
        {
          payer: 'Medicare',
          tier: 'Open',
          priorAuth: false,
          stepTherapy: false,
          copay: '$10',
        },
        {
          payer: 'BCBS',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$20',
        },
        {
          payer: 'Cigna',
          tier: 'Preferred',
          priorAuth: false,
          stepTherapy: false,
          copay: '$15',
        },
        {
          payer: 'UnitedHealthcare',
          tier: 'Unknown',
          priorAuth: 'Unknown',
          stepTherapy: 'Unknown',
          copay: '—',
        },
      ],
    },
  ], // UI: per-product coverage table; export CSV button

  opportunities: [
    {
      id: 'opp-h-1',
      name: 'Add NovoCardia ACE to Post-MI Order Set',
      product: 'NovoCardia ACE 10 mg',
      stage: 'P&T',
      estCloseDate: '2025-09-10',
      amountUSD: 320000,
      probability: 0.6,
      nextAction:
        'Submit 3-year BIA sensitivity + protocol alignment (due Aug 20).',
      owner: 'L. Perez',
      riskFlags: ['Budget pressure FY2025', 'GPO contract timing risk'],
    },
    {
      id: 'opp-h-2',
      name: 'System-wide Diabetes Education Kits',
      product: 'NovoGluco XR 500 mg',
      stage: 'Evaluate',
      estCloseDate: '2025-10-05',
      amountUSD: 120000,
      probability: 0.45,
      nextAction:
        'Book joint session with Diabetes Education lead + Clinic Ops.',
    },
  ],

  risks: [
    {
      label: 'RFP requires GPO-aligned pricing; delays possible',
      severity: 'High',
    },
    { label: 'P&T backlog—decisions slip by 1-2 cycles', severity: 'Med' },
  ],

  compliance: {
    doNotCall: false,
    sampleEligible: false,
    notes: 'Hospital policy restricts samples; use patient vouchers.',
  },

  visitPlan: {
    meetingDate: '2025-08-14T14:30:00-04:00',
    locationHint: 'Pharmacy conference room, Tower B (badge required).',
    goals: [
      'Secure P&T endorsement for post-MI order set inclusion',
      'Align on contract/GPO path with Materials Mgmt',
      'Agree on outcomes tracking plan (30-day readmit)',
    ],
    tailoredTalkTracks: [
      'Budget-neutral scenario year 1 via protocol substitution',
      'Readmission reduction signals in Medicare cohort',
      'EHR order set + pharmacist education plan',
    ],
    suggestedQuestions: [
      'When is the next P&T cycle cut-off?',
      'Any required head-to-head data vs current ACE?',
      'What GPO schedule applies (Vizient/HPG/etc.)?',
    ],
    likelyObjections: [
      {
        objection: 'Budget impact concerns',
        rebuttal: 'Share sensitivity + pathway swap modeling.',
      },
      {
        objection: 'Formulary space already crowded',
        rebuttal: 'Protocol-based positioning with minimal SKU complexity.',
      },
    ],
    leaveBehinds: ['1-pg BIA summary', 'Order set mockup', 'Provider FAQ PDF'],
  }, // UI: checklist with owner and due-dates

  dataQuality: {
    asOf: '2025-08-09T07:45:00Z',
    crmSyncAsOf: '2025-08-08T22:55:00Z',
    gaps: [
      'UHC coverage details unknown—checking payer portal',
      'Exact P&T calendar—confirm next meeting date',
    ],
    confidenceNotes: [
      'Procedure volume derived from hospital claims (rolling 12 months)',
      'Payer mix by net revenue; outpatient pharmacy 340B participation confirmed by prior year report',
    ],
    restrictedFields: [
      'Patient-level data (none surfaced)',
      'Contract drafts (legal-only)',
    ],
  },
}

// -----------------------------
// UI Composition Hints (meta; not rendered to users)
// -----------------------------

export const sectionOrderHint = [
  // UI: sticky summary header with key stats
  'Header: Name • Segment • Specialty • City • Phone',
  'Quick Stats: Staff/Bed count • Payer mix chips • EHR tag',
  'Visit Plan (3 goals up top)',
  'Decision Makers (cards)',
  'Access by Product (tables)',
  'Sales Trends (sparklines)',
  'Interactions Timeline',
  'Top Diagnoses/Procedures (compact tables)',
  'Opportunities (kanban)',
  'Risks & Compliance (bullets)',
  'Logistics (map, parking notes)',
  'Unknowns to Clarify (callouts)',
]

// Minimal type guard helpers for UI checks
export const hasAnyData = (b: BriefingBase) =>
  !!(
    b.decisionMakers?.length ||
    b.sales?.length ||
    b.access?.length ||
    b.recentInteractions?.length
  )
