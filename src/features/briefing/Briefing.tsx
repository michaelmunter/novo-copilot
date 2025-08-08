import type { Brief } from './types'
import { useEffect } from 'react'
import { useBriefingTTS } from './useBriefingTTS'

type Props = {
  data: Brief | null
  ttsEnabled?: boolean
  /** bump this number to trigger a one-shot "read now" */
  readNowSignal?: number
}

function makeBriefingText(b: Brief): string {
  // Expand as fields grow; MVP keeps it simple
  const parts: string[] = []
  if (b.name) parts.push(`Briefing for ${b.name}.`)
  if (b.info) parts.push(b.info)
  return parts.join(' ')
}

export default function Briefing({
  data,
  ttsEnabled = true,
  readNowSignal,
}: Props) {
  if (!data) return null

  const { speak, stop, isSpeaking } = useBriefingTTS()

  // react to external "read now"
  useEffect(() => {
    if (!ttsEnabled || !readNowSignal) return
    speak(makeBriefingText(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readNowSignal]) // intentionally not depending on "data" to avoid surprise re-reads

  return (
    <section className="bg-bg-secondary border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">HCP Intelligence Briefing</h2>
        {ttsEnabled && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => speak(makeBriefingText(data))}
              className="px-3 py-1.5 rounded-md border border-border hover:bg-bg-primary"
              aria-label="Read briefing aloud"
            >
              ▶︎ Read
            </button>
            <button
              type="button"
              onClick={() => stop()}
              disabled={!isSpeaking()}
              className="px-3 py-1.5 rounded-md border border-border hover:bg-bg-primary disabled:opacity-50"
              aria-label="Stop reading"
            >
              ■ Stop
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-3 md:gap-4 text-sm">
        <div>
          <span className="font-medium text-text-primary">Name:</span>{' '}
          <span className="text-text-secondary">{data.name || '—'}</span>
        </div>
        <div>
          <span className="font-medium text-text-primary">Summary:</span>{' '}
          <span className="text-text-secondary">{data.info || '—'}</span>
        </div>
      </div>
    </section>
  )
}

export { Briefing }
