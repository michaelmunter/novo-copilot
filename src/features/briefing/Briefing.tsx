import type { Brief } from './types'

export default function Briefing({ data }: { data: Brief | null }) {
  if (!data) return null
  return (
    <section className="bg-bg-secondary border border-border rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">HCP Intelligence Briefing</h2>
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
