import type { ComparisonContent } from '../../types'

const ComparisonContentComponent = ({
  content,
}: {
  content: ComparisonContent
}) => (
  <div className="space-y-2">
    {content.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <span className="text-text-primary font-medium">{item.name}</span>
          {item.status && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                item.status === 'good'
                  ? 'bg-green-100 text-green-800'
                  : item.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {item.status === 'good'
                ? '✅'
                : item.status === 'warning'
                  ? '⚠️'
                  : '❌'}
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-text-primary font-semibold">{item.value}</div>
          {item.note && (
            <div className="text-xs text-text-secondary">{item.note}</div>
          )}
        </div>
      </div>
    ))}
  </div>
)

export default ComparisonContentComponent
