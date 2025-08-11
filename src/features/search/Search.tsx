import { useState } from 'react'
import { useSearchController } from './useSearchController'
import Suggestions from './components/Suggestions'
import { buildQueryFromHcp } from './formatters'
import { getMockBriefingById } from '../briefing/mockNew'
import { hcpMockService } from './mock'
import type { BriefingData } from '../briefing/types'
import type { HcpService } from './service'
import type { Hcp } from './types'

type Props = {
  onSearchResult: (
    query: string,
    brief?: BriefingData | null,
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
  const [isFocused, setIsFocused] = useState(false)

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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur(e)
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search"
      className="flex text-sm flex-1 justify-end"
    >
      <div className="flex flex-1 gap-0 ">
        {/* Unified container for input + button to get a single focus ring */}
        <div className="group max-w-2xl flex flex-1 items-stretch rounded-lg border border-border bg-bg-secondary focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent focus:bg-bg-primary hover:bg-bg-primary relative shadow-sm ">
          <div className="flex-1 ">
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={
                isFocused ? '' : 'Search by name, specialty, or location'
              }
              className="w-full px-3 py-2 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-transparent text-text-primary rounded-r-lg hover:text-bg-primary hover:bg-accent"
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

          <Suggestions
            ref={listRef}
            open={open}
            items={items}
            highlight={highlight}
            showNpiInSuggestion={showNpiInSuggestion}
            onHover={(i: number) => setHighlight(i)}
            onPick={(h: Hcp) => {
              // prevent blur from closing first
              ignoreBlurRef.current = true
              // Load brief via search-layer backend (mock for now)
              const brief = getMockBriefingById(h.id)
              commitSearch(buildQueryFromHcp(h), brief)
              ignoreBlurRef.current = false
            }}
          />
        </div>
      </div>
    </form>
  )
}

export { Search }
