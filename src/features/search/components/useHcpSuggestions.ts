import { useMemo } from 'react'
import { useCombobox } from './useCombobox'
import type { Hcp } from '../types'
import type { HcpService } from '../service'
import { hcpMockService } from '../mock'

export function useHcpSuggestions(
  service?: HcpService,
  territoryFilter: string[] | null = null
) {
  const api = useMemo(() => service ?? hcpMockService, [service])

  // Fetcher bridges the generic hook and your HCP service.
  const fetcher = (
    q: string,
    opts?: { limit?: number; signal?: AbortSignal }
  ) =>
    api.suggestHcps(q, {
      territoryFilter,
      limit: opts?.limit,
      signal: opts?.signal,
    })

  return useCombobox<Hcp>({ fetcher, minChars: 2, limit: 8, debounceMs: 250 })
}
