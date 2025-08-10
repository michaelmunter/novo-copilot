import { useSearchController } from './useSearchController'
import Suggestions from './components/Suggestions'
import { buildQueryFromHcp } from './formatters'
import type { HcpService } from './service'
import { hcpMockService } from './mock' // optional, since useHcpSuggestions has a default
import type { Brief } from '../briefing/types'
import { getMockBriefById } from '../briefing/mock'

type Props = {
  onSearchResult: (
    query: string,
    brief?: Brief | null,
    message?: string
  ) => void
  hcpService?: HcpService
  territoryFilter?: string[] | null
  showNpiInSuggestion?: boolean
}

export default function Search({
  onSearchResult,
  hcpService,
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
    onFocus,
    onSubmit,
    activeId,
    commitSearch,
  } = useSearchController({
    onSearchResult,
    hcpService: hcpService ?? hcpMockService,
    territoryFilter,
  })

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
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Search by name, specialty, or location"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border bg-bg-input border-border text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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
                // Load brief via search-layer backend (mock for now)
                const brief = getMockBriefById(h.id)
                commitSearch(buildQueryFromHcp(h), brief)
                ignoreBlurRef.current = false
              }}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-input text-text-primary hover:text-bg-primary hover:bg-accent"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>
    </section>
  )
}

export { Search }
