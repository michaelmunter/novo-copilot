import { useEffect } from 'react'
import { useHcpSuggestions } from './components/useHcpSuggestions'
import Suggestions from './components/Suggestions'
import { buildQueryFromHcp } from './formatters'
import { getQueryParam, setQueryParam } from '../../shared/lib/url'
import type { HcpService } from './service'
import { hcpMockService } from './mock' // optional, since useHcpSuggestions has a default

type Props = {
  onSearch: (query: string) => void
  service?: HcpService
  territoryFilter?: string[] | null
  showNpiInSuggestion?: boolean
}

export default function Search({
  onSearch,
  service,
  territoryFilter = null,
  showNpiInSuggestion = false,
}: Props) {
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
    closeMenu,
  } = useHcpSuggestions(service ?? hcpMockService, territoryFilter)

  useEffect(() => {
    const q = getQueryParam('q')
    setQuery(q)
    if (q) onSearch(q)
  }, [onSearch, setQuery])

  const commitSearch = (q: string) => {
    const query = q.trim()
    setQueryParam('q', query)
    onSearch(query)
    closeMenu()
    setTimeout(() => inputRef.current?.blur(), 0)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    commitSearch(query)
  }

  const activeId = highlight >= 0 ? `opt-${highlight}` : undefined

  return (
    <section className="relative">
      <form onSubmit={onSubmit} role="search" aria-label="Search">
        <div className="flex gap-3 md:gap-4">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              role="combobox"
              aria-expanded={open}
              aria-controls="search-suggestions"
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => items.length && (open || setHighlight(0))}
              onBlur={onBlur}
              placeholder="Search by name, specialty, or location"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <Suggestions
              ref={listRef}
              open={open}
              items={items}
              highlight={highlight}
              showNpiInSuggestion={showNpiInSuggestion}
              onHover={(i) => setHighlight(i)}
              onPick={(h) => {
                // prevent blur from closing first
                ignoreBlurRef.current = true
                const q = buildQueryFromHcp(h)
                setQuery(q)
                commitSearch(q)
                ignoreBlurRef.current = false
              }}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  )
}

export { Search }
