export type BriefTab = 'brief' | 'dashboard' | 'profile' | 'interactions'

type Props = {
  active: BriefTab
  onChange: (tab: BriefTab) => void
  recents?: Array<{ id: string; label: string }>
  onSelectRecent?: (id: string) => void
  hasBrief?: boolean
}

const NAV_ITEMS: Array<{
  key: BriefTab
  label: string
  enabled: boolean
}> = [
  { key: 'brief', label: 'AI Brief', enabled: true },
  { key: 'dashboard', label: 'Dashboard', enabled: false },
  { key: 'profile', label: 'Profile', enabled: false },
  { key: 'interactions', label: 'Interactions', enabled: false },
]

export default function Sidebar({
  active,
  onChange,
  recents = [],
  onSelectRecent,
  hasBrief = false,
}: Props) {
  return (
    <nav aria-label="Briefing sections" className="min-w-[200px] text-sm">
      <div className="flex flex-col gap-4">
        {hasBrief && (
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === active
              const base = 'w-full text-left px-3 py-2 rounded-md'
              const state = item.enabled
                ? isActive
                  ? 'bg-accent text-text-hover'
                  : 'hover:bg-accent hover:text-text-hover text-text-primary'
                : 'text-text-secondary hover:text-text-hover cursor-not-allowed opacity-50'
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    className={`${base} ${state}`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-disabled={!item.enabled}
                    onClick={() => item.enabled && onChange(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
        {recents.length !== 0 && (
          <div className={`${hasBrief ? 'pt-2 border-t border-border' : ''}`}>
            <div className="px-1 mb-2 text-xs uppercase tracking-wider text-text-secondary">
              Recent
            </div>

            <ul className="flex flex-col gap-1">
              {recents.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-text-hover text-text-primary truncate"
                    onClick={() => onSelectRecent && onSelectRecent(r.id)}
                    title={r.label}
                  >
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export { Sidebar }
