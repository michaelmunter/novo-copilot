import { useEffect, useState } from 'react'
import Header from './Header'
import { Briefing } from './features/briefing'
import type { Brief } from './features/briefing/types'
import Sidebar, { type BriefTab } from './features/briefing/Sidebar'
import {
  getQueryParam,
  setQueryParams,
  clearQueryParams,
} from './shared/lib/url'
import { getMockBriefById } from './features/briefing/mock'
import './App.css'

export default function App() {
  const [briefingData, setBriefingData] = useState<Brief | null>(null)
  const [activeTab, setActiveTab] = useState<BriefTab>('brief')
  const [recentBriefs, setRecentBriefs] = useState<
    Array<{ id: string; label: string }>
  >(() => {
    try {
      const raw = localStorage.getItem('recentBriefs')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          return parsed
            .filter(
              (r: any) =>
                r && typeof r.id === 'string' && typeof r.label === 'string'
            )
            .slice(0, 10)
        }
      }
    } catch {}
    return []
  })

  const handleSearchResult = (
    _query: string,
    brief?: Brief | null,
    message?: string
  ) => {
    if (message) {
      // toast ??
      return
    }
    if (!brief) return

    setBriefingData(brief)
    setActiveTab('brief')
    const id = brief?.hcpId ?? null
    if (id) {
      // Set both params at once with hcp first
      setQueryParams({ hcp: id, tab: 'brief' })
      const label = brief?.name || brief?.facility?.name || id
      setRecentBriefs((prev) => {
        const next = [{ id, label }, ...prev.filter((r) => r.id !== id)]
        return next.slice(0, 10)
      })
    }
  }

  const clearBrief = () => {
    setBriefingData(null)
    setActiveTab('brief')
    clearQueryParams(['hcp', 'tab'])
  }

  useEffect(() => {
    const tab = (getQueryParam('tab') as BriefTab) || 'brief'
    setActiveTab(tab)
    const id = getQueryParam('hcp')
    if (id) {
      const brief = getMockBriefById(id)
      if (brief) {
        setBriefingData(brief)
        const label = brief.name || brief.facility?.name || id
        setRecentBriefs((prev) => {
          const exists = prev.some((r) => r.id === id)
          const next = exists
            ? prev
            : [{ id, label }, ...prev.filter((r) => r.id !== id)]
          return next.slice(0, 20)
        })
      }
    }
  }, [])

  // persist recents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('recentBriefs', JSON.stringify(recentBriefs))
    } catch {}
  }, [recentBriefs])

  const handleTabChange = (tab: BriefTab) => {
    setActiveTab(tab)
    setQueryParams({ tab })
  }

  return (
    <div className="flex-1 bg-bg-primary min-h-screen text-text-primary">
      <Header
        handleSearchResult={handleSearchResult}
        onLogoClick={clearBrief}
      />
      <div className="px-4 py-6 grid grid-cols-[220px_1fr] gap-6">
        <Sidebar
          active={activeTab}
          onChange={handleTabChange}
          recents={recentBriefs}
          hasBrief={!!briefingData}
          onSelectRecent={(id) => {
            const brief = getMockBriefById(id)
            if (brief) {
              setBriefingData(brief)
              setActiveTab('brief')
              setQueryParams({ hcp: id, tab: 'brief' })
              const label = brief.name || brief.facility?.name || id
              setRecentBriefs((prev) => {
                const next = [{ id, label }, ...prev.filter((r) => r.id !== id)]
                return next.slice(0, 10)
              })
            }
          }}
        />
        <main className="flex justify-center">
          {briefingData && activeTab === 'brief' ? (
            <Briefing data={briefingData} />
          ) : null}
        </main>
      </div>
    </div>
  )
}
