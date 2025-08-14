/*
import type { BriefingData } from './types'

export const MOCK_BRIEFS: Record<string, BriefingData> = {
  // Solo practice example
  SOLO_001: {
    hcpId: 'SOLO_001',
    name: 'Dr. Alicia Patel, MD',
    info: 'Prefers quick morning visits; interested in outcomes data and payer specifics.',
    specialty: 'Endocrinology',
    credentials: 'MD',
    yearsExperience: 14,
    languages: ['English', 'Spanish'],
    primaryLocation: {
      name: 'North Valley Clinic – Endocrinology',
      address: '123 Main St, Fargo, ND 58102',
      phone: '(701) 555-0134',
    },
    segmentation: { segment: 'High Potential', decile: 8, targetingTier: 'A' },
    preferences: { channels: ['In-person', 'Email'], bestTimes: ['Tue AM'] },
    consent: { approvedEmail: true, consentDate: '2025-05-14' },
    sampling: { isEligible: true, stateLicenseValid: true, deaValid: true },
    recentCalls: [
      {
        date: '2025-07-29',
        rep: 'J. Kim',
        summary: 'Discussed GLP‑1 titration; asked for HCP guide.',
        objections: ['Coverage for PlanX'],
        actionItems: ['Bring payer sheet'],
      },
    ],
    sales: {
      ytdRevenue: 187500,
      last90dUnits: 940,
      products: [
        {
          product: 'NovoProduct A',
          ytdUnits: 1200,
          trend: 'up',
          lastOrderDate: '2025-07-25',
        },
        {
          product: 'NovoProduct B',
          ytdUnits: 380,
          trend: 'flat',
          lastOrderDate: '2025-07-18',
        },
      ],
    },
    formulary: [
      { plan: 'BCBS ND', status: 'Preferred', lastUpdated: '2025-07-15' },
      {
        plan: 'Medicare Part D – Humana',
        status: 'Non‑preferred (PA)',
        lastUpdated: '2025-07-01',
      },
    ],
    nba: {
      message:
        'Open with plan‑specific dosing guide and payer sheet for BCBS ND; schedule a 15‑min in‑service.',
      rationale: 'Recent engagement + high decile + payer mix',
      riskFlags: ['Humana Part D requires PA'],
      suggestedArtifacts: ['GLP‑1 Dosing Guide v3', 'BCBS ND Payer One‑Pager'],
    },
    logistics: {
      officeHours: 'Mon–Fri 8:00–16:00',
      visitPreferences: 'Drop‑in before 10:00',
      gatekeepers: ['Front desk: Maria'],
      policies: ['Samples allowed with sign‑off'],
    },
  },

  // Hospital / multi-contact example
  HOSP_101: {
    hcpId: 'HOSP_101',
    facility: {
      name: 'Hennepin Heart Center',
      address: '700 S 6th St, Minneapolis, MN 55415',
      phone: '(612) 555-0114',
      department: 'Cardiology',
      bedCount: 75,
    },
    contacts: [
      {
        contactId: 'C001',
        name: 'Dr. Tomas Eriksen, DO',
        role: 'Interventional Cardiologist',
        specialty: 'Cardiology',
        influence: 'high',
        preferences: { channels: ['In-person'], bestTimes: ['Wed AM'] },
      },
      {
        contactId: 'C002',
        name: 'Brooke Nguyen, PA‑C',
        role: 'Physician Assistant',
        specialty: 'Cardiology',
        influence: 'medium',
        preferences: { channels: ['Virtual', 'Email'] },
      },
    ],
    segmentation: { segment: 'Key Account', decile: 9, targetingTier: 'A' },
    recentCalls: [
      {
        date: '2025-08-01',
        rep: 'D. Larson',
        summary: 'KOL asked for CVOT compendium and local outcomes.',
      },
    ],
    sales: {
      ytdRevenue: 245000,
      last90dUnits: 1120,
      products: [
        {
          product: 'NovoProduct C',
          ytdUnits: 1500,
          trend: 'up',
          lastOrderDate: '2025-08-01',
        },
      ],
    },
    formulary: [
      {
        plan: 'HealthPartners',
        status: 'Preferred',
        lastUpdated: '2025-07-18',
      },
    ],
    nba: {
      message:
        'Lead with CVOT data; confirm interest in KOL roundtable invite; align with cardiology leadership on in‑service.',
      suggestedArtifacts: ['CVOT Compendium v2', 'Outcomes Registry Snapshot'],
    },
    logistics: {
      officeHours: 'Mon–Fri 9:00–17:00',
      visitPreferences: 'Appointment required; check‑in at main reception',
      gatekeepers: ['Nurse manager: Lee', 'Front desk: Ava'],
      policies: [
        'Device demos require prior scheduling',
        'Samples via pharmacy only',
      ],
    },
  },
}

export function getMockBriefById(id: string): Brief | null {
  return MOCK_BRIEFS[id] ?? null
}
*/
