import { useState } from 'react'
import Header from './Header'
import { Search } from './features/search'
import { Briefing } from './features/briefing'
import './App.css'

export default function App() {
  const [briefingData, setBriefingData] = useState<{
    name?: string
    info?: string
  } | null>(null)
  const [readNowTick, setReadNowTick] = useState(0)

  const handleSearch = (query: string) => {
    if (!query.trim()) return setBriefingData(null)
    setBriefingData({ name: query, info: 'Sample briefing data' })
  }

  const handleCommand = (name: 'read_briefing') => {
    if (name === 'read_briefing' && briefingData) {
      setReadNowTick((n) => n + 1) // triggers Briefing to speak
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <Search onSearch={handleSearch} onCommand={handleCommand} />
        <Briefing data={briefingData} readNowSignal={readNowTick} />
      </main>
    </div>
  )
}
