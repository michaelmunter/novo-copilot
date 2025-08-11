import type { ChartContent, SubBriefData } from '../../types'

const ChartContentComponent = ({
  content,
  metadata,
}: {
  content: ChartContent
  metadata?: SubBriefData['metadata']
}) => (
  <div className="h-48 bg-bg-secondary rounded-lg flex items-center justify-center border border-border">
    <div className="text-center text-text-secondary">
      <div className="text-lg mb-2">📊</div>
      <div className="text-sm">
        {metadata?.chartType || 'line'} chart
        {metadata?.xAxis && metadata?.yAxis && (
          <div className="text-xs mt-1">
            {metadata.xAxis} vs {metadata.yAxis}
          </div>
        )}
      </div>
      <div className="text-xs mt-2">{content.data.length} data points</div>
    </div>
  </div>
)

export default ChartContentComponent
