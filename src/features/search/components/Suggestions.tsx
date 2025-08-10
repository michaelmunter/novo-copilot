import { forwardRef } from 'react'
import type { Hcp } from '../types'

type Props = {
  open: boolean
  items: Hcp[]
  highlight: number
  showNpiInSuggestion?: boolean
  onHover: (index: number) => void
  onPick: (hcp: Hcp) => void
}

const Suggestions = forwardRef<HTMLUListElement, Props>(
  ({ open, items, highlight, showNpiInSuggestion, onHover, onPick }, ref) => {
    if (!open || items.length === 0) return null

    return (
      <ul
        id="search-suggestions"
        role="listbox"
        ref={ref}
        onMouseLeave={() => onHover(-1)}
        className="absolute z-20 top-full mt-1 w-full max-h-80 overflow-auto rounded-lg border border-border bg-bg-secondary shadow-sm"
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
                e.preventDefault()
              }} // let parent ignore blur
              onClick={() => onPick(h)}
              onMouseEnter={() => onHover(i)}
              className={`px-3  py-1 cursor-pointer ${selected ? 'bg-bg-primary' : ''}`}
            >
              <div className="truncate">
                <span className="">
                  {h.lastName}, {h.firstName}
                </span>
                <span className="text-text-secondary">
                  {' '}
                  • {h.specialty} • {h.city}, {h.state}
                  {h.organization ? ` • ${h.organization}` : ''}
                  {showNpiInSuggestion && h.npi ? ` • NPI ${h.npi}` : ''}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
)

export default Suggestions
