import { useSearchController } from './useSearchController'
import Suggestions from './components/Suggestions'
import { buildQueryFromHcp } from './formatters'
import type { HcpService } from './service'
import { hcpMockService } from './mock' // optional, since useHcpSuggestions has a default

type Props = {
  onSearch: (query: string) => void
  onCommand?: (name: 'read_briefing') => void // <-- NEW (optional)
  hcpService?: HcpService
  territoryFilter?: string[] | null
  showNpiInSuggestion?: boolean
}

export default function Search({
  onSearch,
  onCommand,
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
    onSearch,
    onCommand,
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
                commitSearch(buildQueryFromHcp(h))
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
