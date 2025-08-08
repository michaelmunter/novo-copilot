// imports: remove Spinner import
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Hcp } from './types'
import type { HcpService } from './service'
import { hcpMockService } from './mock'
import { buildQueryFromHcp } from './formatters'
import { getQueryParam, setQueryParam } from '../../shared/lib/url'

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
  const api = useMemo(() => service ?? hcpMockService, [service])
  // --- state & refs ---
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Hcp[]>([])
  const [highlight, setHighlight] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const ignoreBlurRef = useRef(false) // NEW: prevents blur during list click
  const abortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<number | null>(null)

  // helpers
  const closeMenu = () => {
    setOpen(false)
    setHighlight(-1)
  }

  // hydrate from URL (?q=) once
  useEffect(() => {
    const q = getQueryParam('q')
    setSearch(q)
    if (q) onSearch(q)
  }, [])

  const commitSearch = (q: string) => {
    const query = q.trim()
    setQueryParam('q', query)
    onSearch(query)
    closeMenu()
    setTimeout(() => inputRef.current?.blur(), 0) // you chose blur, good call
  }

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const t = e.target as Node
      const clickedInput = !!inputRef.current && inputRef.current.contains(t)
      const clickedList = !!listRef.current && listRef.current.contains(t)
      if (!clickedInput && !clickedList) closeMenu()
    }
    document.addEventListener('pointerdown', handler, { capture: true })
    return () =>
      document.removeEventListener('pointerdown', handler, {
        capture: true,
      } as any)
  }, [])

  // debounced suggestions with cancellation
  // suggestions effect: simplify, no loading/empty toggles
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      const q = search.trim()
      if (q.length < 2) {
        setItems([])
        setOpen(false)
        setHighlight(-1)
        return
      }

      try {
        const next = await api.suggestHcps(q, {
          territoryFilter,
          limit: 8,
          signal: abortRef.current.signal,
        })
        setItems(next)
        setOpen(next.length > 0) // only open when there are results
        setHighlight(next.length ? 0 : -1)
      } catch {
        /* ignore AbortError */
      }
    }, 250)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
      abortRef.current?.abort()
    }
  }, [search, territoryFilter, api])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    commitSearch(search)
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      if (items.length) setOpen(true)
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (items.length) setHighlight((h) => (h + 1) % items.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (items.length)
          setHighlight((h) => (h - 1 + items.length) % items.length)
        break
      case 'Enter':
        if (open && highlight >= 0 && items[highlight]) {
          e.preventDefault()
          const picked = items[highlight]
          const q = buildQueryFromHcp(picked)
          setSearch(q)
          commitSearch(q)
        }
        break
      case 'Escape':
        closeMenu()
        break
    }
  }

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (ignoreBlurRef.current) {
      // NEW: allow list click to pass first
      ignoreBlurRef.current = false
      return
    }
    setTimeout(() => closeMenu(), 0)
  }

  useEffect(() => {
    const onPop = () => closeMenu()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // click-away
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node
      const clickedInput = inputRef.current?.contains(t)
      const clickedList = listRef.current && listRef.current.contains(t)

      if (!clickedInput && !clickedList) {
        setOpen(false)
        setHighlight(-1)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => items.length && setOpen(true)}
              onBlur={onBlur}
              placeholder="Search by name, specialty, or location"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />

            {open && items.length > 0 && (
              <ul
                id="search-suggestions"
                role="listbox"
                ref={listRef}
                onMouseLeave={() => setHighlight(-1)}
                className="absolute z-20 mt-2 w-full max-h-80 overflow-auto rounded-lg border border-border bg-bg-secondary shadow-sm"
              >
                {items.map((h, i) => {
                  const selected = i === highlight
                  return (
                    <li
                      key={h.id}
                      id={`opt-${i}`}
                      role="option"
                      aria-selected={selected}
                      onMouseDown={(e) => {
                        // NEW: prevent blur from firing first
                        e.preventDefault()
                        ignoreBlurRef.current = true
                      }}
                      onClick={() => {
                        // NEW: do selection on click
                        const q = buildQueryFromHcp(h)
                        setSearch(q)
                        commitSearch(q)
                        ignoreBlurRef.current = false
                      }}
                      onMouseEnter={() => setHighlight(i)}
                      className={`px-3 py-2 cursor-pointer ${selected ? 'bg-bg-primary' : ''}`}
                    >
                      <div className="truncate">
                        <span className="font-medium">
                          {h.lastName}, {h.firstName}
                        </span>
                        <span className="text-text-secondary">
                          {' '}
                          • {h.specialty} • {h.city}, {h.state}
                          {h.organization ? ` • ${h.organization}` : ''}
                          {showNpiInSuggestion && h.npi
                            ? ` • NPI ${h.npi}`
                            : ''}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
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

export { Search } // named export for barrel
