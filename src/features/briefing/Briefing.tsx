import { useState, useEffect } from 'react'
import SubBrief from './subBrief/SubBrief'
import type { BriefingData } from './types'
import { useBriefingTTS } from './useBriefingTTS'
import { MOCK_BRIEFINGS } from './mockNew'

interface Props {
  briefId?: string | null
}

export default function Briefing({ briefId }: Props) {
  const [briefing, setBriefing] = useState<BriefingData | null>(null)
  const { speak, stop, isSpeaking } = useBriefingTTS()

  useEffect(() => {
    if (briefId && MOCK_BRIEFINGS[briefId]) {
      setBriefing(MOCK_BRIEFINGS[briefId])
    } else {
      setBriefing(null)
    }
  }, [briefId])

  if (!briefing) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">
          {briefId ? 'Brief not found' : 'Select a brief from the sidebar'}
        </p>
      </div>
    )
  }

  const handleTTS = () => {
    if (isSpeaking) {
      stop()
    } else {
      const briefingText = `Briefing for ${briefing.name}. ${briefing.subBriefs.map((sb) => `${sb.title}. ${typeof sb.content === 'string' ? sb.content : 'Data section.'}`).join(' ')}`
      speak(briefingText)
    }
  }

  return (
    <div className="w-full max-w-4xl p-6">
      {/* Header with TTS */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {briefing.name}
            </h1>
            <p className="text-sm text-text-secondary">
              Updated {new Date(briefing.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <button
            type="button"
            onClick={handleTTS}
            aria-pressed={isSpeaking}
            aria-label={isSpeaking ? 'Stop reading' : 'Read briefing aloud'}
            className="px-3 py-1.5 rounded-md text-accent hover:bg-accent hover:text-text-hover"
          >
            {isSpeaking ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {briefing.subBriefs.map((subBrief, index) => (
          <SubBrief key={`${subBrief.title}-${index}`} data={subBrief} />
        ))}
      </div>
    </div>
  )
}
