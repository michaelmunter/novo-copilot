import { useCallback, useEffect, useMemo, useRef } from 'react'
import { searchIntent } from './searchIntent'
import { useHcpSuggestions } from './components/useHcpSuggestions'
import type { HcpService } from './service'
import { hcpMockService } from './mock'
import { getQueryParam } from '../../shared/lib/url'

type Params = {
  onSearch: (query: string) => void
  onCommand?: (name: 'read_briefing') => void
  hcpService?: HcpService
  territoryFilter?: string[] | null
}

export function useSearchController({
  onSearch,
  onCommand,
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
  } = useHcpSuggestions(hcpService ?? hcpMockService, territoryFilter)

  const didInitRef = useRef(false)
  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true
    const initialQuery = getQueryParam('q')
    if (initialQuery) onSearch(initialQuery)
  }, [onSearch])

  const clearUrlQueryReplace = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    params.delete('q')
    const qs = params.toString()
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
    window.history.replaceState({}, '', newUrl)
  }, [])

  const commitSearch = useCallback(
    (raw: string) => {
      const intent = searchIntent(raw)
      if (intent.type === 'hcp') {
        const normalized = intent.query.trim()
        onSearch(normalized)
      } else {
        onCommand?.(intent.name)
      }
      closeMenu()
      setQuery('')
      clearUrlQueryReplace()
      setTimeout(() => inputRef.current?.blur(), 0)
    },
    [onSearch, onCommand, closeMenu, setQuery, clearUrlQueryReplace, inputRef]
  )

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      commitSearch(query)
    },
    [commitSearch, query]
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

