import type { MetricsContent } from '../../types'

const MetricsContentComponent = ({ content }: { content: MetricsContent }) => (
  <div className="grid grid-cols-2 gap-4">
    {content.map((metric, index) => (
      <div key={index} className="text-center p-3 bg-bg-secondary rounded-lg">
        <div
          className={`text-2xl font-bold ${metric.color || 'text-text-primary'}`}
        >
          {metric.value}
        </div>
        <div className="text-sm text-text-secondary mt-1">{metric.label}</div>
        {metric.trend && (
          <div className="text-xs mt-1">
            {metric.trend === 'up'
              ? '📈'
              : metric.trend === 'down'
                ? '📉'
                : '➡️'}
          </div>
        )}
      </div>
    ))}
  </div>
)

export default MetricsContentComponent
