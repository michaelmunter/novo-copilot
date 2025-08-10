import { useState } from 'react'
import Header from './Header'
import { Search } from './features/search'
import { Briefing } from './features/briefing'
import './App.css'

export default function App() {
  const [briefingData, setBriefingData] = useState<any | null>(null)
  // Retained TTS controls are handled inside Briefing; remove external trigger

  const handleSearchResult = (
    _query: string,
    brief?: any | null,
    message?: string
  ) => {
    if (message) {
      setBriefingData({ errorMessage: message })
      return
    }
    setBriefingData(brief ?? null)
  }

  // TTS can be triggered directly from Briefing via its button; no external command wiring needed

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <Search onSearchResult={handleSearchResult} />
        {briefingData?.errorMessage ? (
          <section className="rounded-xl p-4 text-text-secondary">
            {briefingData.errorMessage}
          </section>
        ) : briefingData ? (
          <Briefing data={briefingData} />
        ) : null}
      </main>
    </div>
  )
}
