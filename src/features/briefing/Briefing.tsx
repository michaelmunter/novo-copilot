import type { Brief } from './types'
import { useEffect } from 'react'
import { useBriefingTTS } from './useBriefingTTS'

type Props = {
  data: Brief | null
  ttsEnabled?: boolean
  /** bump this number to trigger a one-shot "read now" */
  ttsTrigger?: number
}

function makeBriefingText(b: Brief): string {
  const parts: string[] = []
  const subject = b.name || b.facility?.name || 'this contact'
  parts.push(`Briefing for ${subject}.`)
  if (b.nba?.message) parts.push(b.nba.message)
  else if (b.info) parts.push(b.info)
  if (b.specialty) parts.push(`Specialty: ${b.specialty}.`)
  if (b.primaryLocation?.name)
    parts.push(`Location: ${b.primaryLocation.name}.`)
  return parts.join(' ')
}

export default function Briefing({
  data,
  ttsEnabled = true,
  ttsTrigger,
}: Props) {
  if (!data) return null

  const { speak, stop, isSpeaking } = useBriefingTTS()

  // react to external "read now"
  useEffect(() => {
    if (!ttsEnabled || !ttsTrigger) return
    speak(makeBriefingText(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ttsTrigger]) // intentionally not depending on "data" to avoid surprise re-reads

  return (
    <section className="bg-bg-secondary border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">HCP Intelligence Briefing</h2>
        <div>
          <button
            type="button"
            onClick={() =>
              isSpeaking ? stop() : speak(makeBriefingText(data))
            }
            aria-pressed={isSpeaking}
            aria-label={isSpeaking ? 'Stop reading' : 'Read briefing aloud'}
            className={`px-3 py-1.5 rounded-md  hover:bg-accent hover:text-text-hover `}
          >
            {isSpeaking ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
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
                className="w-5 h-5"
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
      </div>

      {data.facility ? (
        <div className="text-text-secondary">
          <div>{data.facility.name}</div>
          {data.facility.department && (
            <div>Dept: {data.facility.department}</div>
          )}
          {data.facility.address && <div>{data.facility.address}</div>}
          {data.contacts && data.contacts.length > 0 && (
            <div className="mt-2">
              <div className="text-text-primary">Contacts:</div>
              <ul className="list-disc ml-5">
                {data.contacts.map((c) => (
                  <li key={c.contactId}>
                    <span className="text-text-primary">{c.name}</span>
                    {c.role && (
                      <span className="text-text-secondary"> — {c.role}</span>
                    )}
                    {c.influence && (
                      <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-bg-primary border border-border">
                        {c.influence}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-text-secondary">
          <div>{data.name}</div>
          {(data.specialty || data.credentials) && (
            <div>
              {[data.specialty, data.credentials].filter(Boolean).join(', ')}
            </div>
          )}
          {data.primaryLocation?.name && <div>{data.primaryLocation.name}</div>}
        </div>
      )}

      {data.logistics && (
        <div>
          <div className="text-text-secondary">
            {data.logistics.officeHours && (
              <div>Hours: {data.logistics.officeHours}</div>
            )}
            {data.logistics.visitPreferences && (
              <div>Visits: {data.logistics.visitPreferences}</div>
            )}
            {data.logistics.policies && data.logistics.policies.length > 0 && (
              <div>Policies: {data.logistics.policies.join(', ')}</div>
            )}
          </div>
        </div>
      )}
      {/* AI summary / Today's plan */}
      {(data.nba?.message || data.info) && (
        <div className="mb-4">
          <div className="text-text-secondary">AI summary: </div>
          <p className="mt-1 text-text-primary">
            {data.nba?.message ?? data.info}
          </p>
          {data.nba?.riskFlags && data.nba.riskFlags.length > 0 && (
            <div className="mt-2 flex text-xs flex-wrap gap-2">
              {data.nba.riskFlags.map((r, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-bg-primary border border-border"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 md:gap-5">
        {/* Relationship snapshot */}
        {(data.recentCalls?.length || data.recentEmails?.length) && (
          <div>
            <div className="font-medium text-text-primary mb-1">
              Relationship
            </div>
            {data.recentCalls?.slice(0, 3).map((c, i) => (
              <div key={i} className="text-text-secondary">
                {c.date}: {c.summary}
              </div>
            ))}
            {data.recentEmails?.slice(0, 2).map((e, i) => (
              <div key={`e${i}`} className="text-text-secondary">
                Email {e.date}: {e.subject}
              </div>
            ))}
          </div>
        )}

        {/* Objections */}
        {data.recentCalls?.some((c) => c.objections && c.objections.length) && (
          <div>
            <div className="font-medium text-text-primary mb-1">Objections</div>
            <ul className="list-disc ml-5 text-text-secondary">
              {data
                .recentCalls!.flatMap((c) => c.objections || [])
                .slice(0, 3)
                .map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
            </ul>
          </div>
        )}

        {/* Formulary */}
        {data.formulary && data.formulary.length > 0 && (
          <div>
            <div className="font-medium text-text-primary mb-1">Formulary</div>
            <ul className="list-disc ml-5 text-text-secondary">
              {data.formulary.slice(0, 4).map((f, i) => (
                <li key={i}>
                  {f.plan}: {f.status}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sales */}
        {data.sales?.products && data.sales.products.length > 0 && (
          <div>
            <div className="font-medium text-text-primary mb-1">Sales</div>
            <ul className="list-disc ml-5 text-text-secondary">
              {data.sales.products.slice(0, 3).map((p, i) => (
                <li key={i}>
                  {p.product}: {p.ytdUnits ?? 0} YTD{' '}
                  {p.trend ? `(${p.trend})` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export { Briefing }
