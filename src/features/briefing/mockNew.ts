import type {
  BriefingData,
  SubBriefData,
  TextContent,
  TableContent,
  MetricsContent,
  ListContent,
  ComparisonContent,
} from './types'

// Convert the compact briefing data from mock2.ts to our new simple format

export const MOCK_BRIEFINGS: Record<string, BriefingData> = {
  SOLO_001: {
    id: 'SOLO_001',
    name: 'North Shore Family Care, PLLC',
    lastUpdated: '2025-08-09T10:30:00Z',
    subBriefs: [
      {
        title: 'Meeting Info',
        type: 'text',
        content: {
          text: 'August 12, 2025 at 10:00 AM - Suite 200, parking behind building',
          highlights: [
            'Tier A practice',
            'Family Medicine & Primary Care',
            '≈5,600 patients, 14 staff',
          ],
        } as TextContent,
      },
      {
        title: 'Essentials',
        type: 'list',
        content: [
          'Goal: Confirm 10-patient NovoGluco XR pilot outcomes',
          'Ask: Agree on PA workflow + stock starter packs',
          'Risk: Aetna PA burden; high Medicaid share → price sensitivity',
          'Tactic: Lead with once-daily adherence + PA auto-approval data; offer patient assistance',
        ] as ListContent,
      },
      {
        title: 'Formulary Access',
        type: 'comparison',
        content: [
          { name: 'Medicare', value: 'Covered', status: 'good' },
          { name: 'BCBS', value: 'Covered', status: 'good' },
          {
            name: 'Aetna',
            value: 'PA Required',
            status: 'warning',
            note: 'Prior auth needed',
          },
          {
            name: 'Medicaid',
            value: 'Covered',
            status: 'good',
            note: 'ST after metformin IR',
          },
          { name: 'UHC', value: 'Unknown', status: 'error' },
        ] as ComparisonContent,
      },
      {
        title: 'Sales Performance',
        type: 'table',
        content: {
          headers: ['Product', 'Last 12mo Units', 'Last Order', 'Trend'],
          rows: [
            ['NovoGluco XR 500mg', '1,280', 'Jul 24, 2025 (120 units)', '📈'],
            ['NovoCardia ACE 10mg', '620', 'Jun 29, 2025 (60 units)', '📈'],
          ],
          summary: 'Both products showing positive growth trajectory',
        } as TableContent,
      },
      {
        title: 'Decision Makers',
        type: 'comparison',
        content: [
          {
            name: 'Ariana Patel, MD',
            value: 'Medical Director',
            status: 'good',
            note: 'Advocate - 88% influence',
          },
          {
            name: 'Shawn Li',
            value: 'Practice Manager',
            status: 'warning',
            note: 'Neutral - 71% influence',
          },
        ] as ComparisonContent,
      },
      {
        title: 'Next Steps',
        type: 'list',
        content: [
          'Review pilot outcomes together',
          'Finalize PA form workflow (esp. Aetna)',
          'Confirm starter pack storage & reorder process',
        ] as ListContent,
      },
      {
        title: 'Adherence Lift Projection',
        type: 'text',
        content: {
          text: 'Based on payer mix + once-daily dosing, expected 6–9% 90-day persistence lift if PA friction reduced.',
          highlights: [
            'Custom AI field',
            'Based on current payer mix and PA barriers',
          ],
        } as TextContent,
      },
    ],
  },

  HOSP_101: {
    id: 'HOSP_101',
    name: 'Great Lakes University Hospital',
    lastUpdated: '2025-08-09T10:30:00Z',
    subBriefs: [
      {
        title: 'Meeting Info',
        type: 'text',
        content: {
          text: 'August 14, 2025 at 2:30 PM - Pharmacy conference room, Tower B (badge required)',
          highlights: [
            'Tier A hospital',
            'Cardiology, Endocrinology, Emergency Medicine',
            '4,200 staff, 340B eligible',
          ],
        } as TextContent,
      },
      {
        title: 'Essentials',
        type: 'list',
        content: [
          'Goal: Secure P&T endorsement for post-MI order set (NovoCardia ACE)',
          'Ask: Align GPO/contract path; confirm outcomes tracking plan',
          'Risk: Budget pressure FY25; P&T backlog may slip decision',
          'Tactic: Lead with budget-neutral protocol swap + 30-day readmit reduction signals',
        ] as ListContent,
      },
      {
        title: 'Performance Metrics',
        type: 'metrics',
        content: [
          { label: 'NovoCardia ACE', value: '18,200', trend: 'up' },
          { label: 'Last 12mo Units', value: '1,600', trend: 'up' },
          { label: 'NovoGluco XR', value: '9,800', trend: 'up' },
          { label: 'Last Order', value: '900 units', trend: 'flat' },
        ] as MetricsContent,
      },
      {
        title: 'Decision Makers',
        type: 'table',
        content: {
          headers: ['Name', 'Role', 'Stance', 'Influence'],
          rows: [
            ['Marta Nguyen, PharmD', 'Pharmacy Director', 'Neutral', '90%'],
            ["Daniel O'Connor, MD", 'Cardiology Chief', 'Advocate', '84%'],
            ['Sara James', 'Materials Mgmt Buyer', 'Skeptical', '68%'],
          ],
        } as TableContent,
      },
      {
        title: 'Next Steps',
        type: 'list',
        content: [
          'Submit 3-yr BIA sensitivity by Aug 20',
          'Align on GPO contract path with Materials Mgmt',
          'Prepare pharmacist education + order set mockup',
        ] as ListContent,
      },
      {
        title: 'Budget Impact Analysis',
        type: 'text',
        content: {
          text: 'Protocol substitution keeps net drug spend flat year 1 at current case mix; sensitivity ±3% under low-adoption.',
          highlights: [
            'Custom AI analysis',
            'Budget-neutral in year 1',
            'Based on current post-MI protocols',
          ],
        } as TextContent,
      },
    ],
  },
}

export function getMockBriefingById(id: string): BriefingData | null {
  return MOCK_BRIEFINGS[id] ?? null
}
