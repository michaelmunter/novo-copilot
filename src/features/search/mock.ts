import type { Hcp } from './types'
import type { HcpService } from './service'

const MOCK_HCPS: Hcp[] = [
  {
    id: '1',
    npi: '1234567890',
    firstName: 'Alicia',
    lastName: 'Nguyen',
    specialty: 'Cardiology',
    city: 'Minneapolis',
    state: 'MN',
    organization: 'North Star Heart Institute',
    territoryIds: ['NORTH-MN'],
    active: true,
  },
  {
    id: '2',
    npi: '2234567890',
    firstName: 'Brian',
    lastName: 'Patel',
    specialty: 'Dermatology',
    city: 'Milwaukee',
    state: 'WI',
    organization: 'Lakeview Dermatology Group',
    territoryIds: ['NORTH-WI'],
    active: true,
  },
  {
    id: '3',
    npi: '3234567890',
    firstName: 'Cynthia',
    lastName: 'Ramos',
    specialty: 'Endocrinology',
    city: 'Fargo',
    state: 'ND',
    organization: 'Prairie Health Clinic',
    territoryIds: ['NORTH-ND'],
    active: true,
  },
  {
    id: '4',
    npi: '4234567890',
    firstName: 'David',
    lastName: 'Kim',
    specialty: 'Oncology',
    city: 'Duluth',
    state: 'MN',
    organization: 'St. Luke’s Cancer Center',
    territoryIds: ['NORTH-MN'],
    active: true,
  },
  {
    id: '5',
    npi: '5234567890',
    firstName: 'Elena',
    lastName: 'Smith',
    specialty: 'Family Medicine',
    city: 'Green Bay',
    state: 'WI',
    organization: 'Harbor Family Practice',
    territoryIds: ['NORTH-WI'],
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
