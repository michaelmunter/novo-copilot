import { useCallback, useEffect, useMemo, useRef } from 'react'
// simplified: no external command intents; treat input as HCP query
import { useHcpSuggestions } from './components/useHcpSuggestions'
import type { HcpService } from './service'
import { getQueryParam } from '../../shared/lib/url'
import type { Brief } from '../briefing/types'

type Params = {
  onSearchResult: (
    query: string,
    brief?: Brief | null,
    message?: string
  ) => void
  hcpService?: HcpService
  territoryFilter?: string[] | null
}

export function useSearchController({
  onSearchResult,
  hcpService,
  territoryFilter = null,
}: Params) {
  const {
    query,
    setQuery,
    items,
    open,
    highlight,
    setHighlight,
    inputRef,
    listRef,
    ignoreBlurRef,
    onKeyDown,
    onBlur,
    onFocus,
    closeMenu,
  } = useHcpSuggestions(hcpService, territoryFilter)

  const didInitRef = useRef(false)
  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true
    const initialQuery = getQueryParam('q')
    if (initialQuery) onSearchResult(initialQuery)
  }, [onSearchResult])

  const clearUrlQueryReplace = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    params.delete('q')
    const qs = params.toString()
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
    window.history.replaceState({}, '', newUrl)
  }, [])

  const commitSearch = useCallback(
    (raw: string, brief?: Brief | null) => {
      // stop any ongoing TTS when starting a new search
      try {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel()
        }
      } catch {}
      const normalized = raw.trim()
      onSearchResult(normalized, brief)
      closeMenu()
      setQuery('')
      clearUrlQueryReplace()
      setTimeout(() => inputRef.current?.blur(), 0)
    },
    [onSearchResult, closeMenu, setQuery, clearUrlQueryReplace, inputRef]
  )

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      // Free-typed submit: no selected brief; emit a no-results message
      commitSearch(query, null)
      onSearchResult(query, null, 'No results found')
    },
    [commitSearch, onSearchResult, query]
  )

  const activeId = useMemo(
    () => (highlight >= 0 ? `opt-${highlight}` : undefined),
    [highlight]
  )

  return {
    // state
    query,
    setQuery,
    items,
    open,
    highlight,
    setHighlight,
    // refs
    inputRef,
    listRef,
    ignoreBlurRef,
    // events
    onKeyDown,
    onBlur,
    onFocus,
    onSubmit,
    // helpers
    activeId,
    commitSearch,
  }
}
