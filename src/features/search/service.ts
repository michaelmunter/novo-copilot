import type { Hcp } from './types'

export interface HcpService {
  suggestHcps: (
    query: string,
    opts?: {
      territoryFilter?: string[] | null
      limit?: number
      signal?: AbortSignal
    }
  ) => Promise<Hcp[]>
}
