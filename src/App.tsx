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

  const handleSearch = (query: string) => {
    if (!query.trim()) return setBriefingData(null)
    // TODO: replace with real fetch of briefing by parsed query
    setBriefingData({ name: query, info: 'Sample briefing data' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <Search onSearch={handleSearch} />
        <Briefing data={briefingData} />
      </main>
    </div>
  )
}
