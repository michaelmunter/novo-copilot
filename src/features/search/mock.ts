import type { Hcp } from './types'
import type { HcpService } from './service'

// Consolidated with briefing mocks: only these two are returned
const MOCK_HCPS: Hcp[] = [
  // Solo practice HCP (maps to briefing id SOLO_001)
  {
    id: 'SOLO_001',
    npi: '1234567890',
    firstName: 'Alicia',
    lastName: 'Patel',
    specialty: 'Endocrinology',
    city: 'Fargo',
    state: 'ND',
    organization: 'North Valley Clinic – Endocrinology',
    territoryIds: ['NORTH-ND'],
    active: true,
  },
  // Hospital account primary contact (maps to briefing id HOSP_101)
  {
    id: 'HOSP_101',
    npi: '9876543210',
    firstName: 'Tomas',
    lastName: 'Eriksen',
    specialty: 'Cardiology',
    city: 'Minneapolis',
    state: 'MN',
    organization: 'Hennepin Heart Center',
    territoryIds: ['NORTH-MN'],
    active: true,
  },
]

const normalize = (s: string) => s.toLowerCase()

/** lenient token logic: every token must match at least one field */
function matchesTokens(h: Hcp, tokens: string[]) {
  const hay = [
    h.firstName,
    h.lastName,
    `${h.firstName} ${h.lastName}`,
    h.specialty,
    h.city,
    h.state,
    h.organization ?? '',
    h.npi ?? '',
  ].map(normalize)

  return tokens.every((t) => hay.some((f) => f.includes(t)))
}

export const hcpMockService: HcpService = {
  async suggestHcps(query, opts) {
    const { territoryFilter = null, limit = 8, signal } = opts || {}
    const tokens = normalize(query).trim().split(/\s+/).filter(Boolean)
    if (!tokens.length) return []

    // fake latency & support AbortController
    await new Promise<void>((res, rej) => {
      const id = setTimeout(res, 250)
      signal?.addEventListener('abort', () => {
        clearTimeout(id)
        rej(new DOMException('Aborted', 'AbortError'))
      })
    })

    const inTerritory = (h: Hcp) =>
      !territoryFilter?.length ||
      h.territoryIds?.some((t) => territoryFilter.includes(t))

    return MOCK_HCPS.filter((h) => h.active !== false)
      .filter(inTerritory)
      .filter((h) => matchesTokens(h, tokens))
      .slice(0, limit)
  },
}
