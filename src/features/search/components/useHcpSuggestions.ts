import { useCallback } from 'react'
import { useCombobox, type ComboboxFetcher } from './useCombobox'
import type { Hcp } from '../types'
import type { HcpService } from '../service'

export function useHcpSuggestions(
  service?: HcpService,
  territoryFilter: string[] | null = null
) {
  const api: HcpService = service ?? {
    suggestHcps: async () => [],
  }

  // Fetcher bridges the generic hook and your HCP service.
  const fetcher: ComboboxFetcher<Hcp> = useCallback(
    (q: string, opts?: { limit?: number; signal?: AbortSignal }) =>
      api.suggestHcps(q, {
        territoryFilter,
        limit: opts?.limit,
        signal: opts?.signal,
      }),
    [api, territoryFilter]
  )

  return useCombobox<Hcp>({ fetcher, minChars: 2, limit: 8, debounceMs: 250 })
}
