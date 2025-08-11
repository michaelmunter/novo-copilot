import type { SubBriefData } from '../types'
import TextContentComponent from './components/TextContent'
import TableContentComponent from './components/TableContent'
import ChartContentComponent from './components/ChartContent'
import MetricsContentComponent from './components/MetricsContent'
import ListContentComponent from './components/ListContent'
import ComparisonContentComponent from './components/ComparisonContent'

const SubBrief = ({ data }: { data: SubBriefData }) => {
  return (
    <div className="bg-bg-secondary rounded-lg shadow-sm border border-border p-4 mb-4">
      <h3 className="font-semibold text-text-primary mb-3">{data.title}</h3>
      <SubBriefContent
        type={data.type}
        content={data.content}
        metadata={data.metadata}
      />
    </div>
  )
}

const SubBriefContent = ({
  type,
  content,
  metadata,
}: {
  type: SubBriefData['type']
  content: any
  metadata?: SubBriefData['metadata']
}) => {
  switch (type) {
    case 'text':
      return <TextContentComponent content={content} />
    case 'table':
      return <TableContentComponent content={content} />
    case 'chart':
      return <ChartContentComponent content={content} metadata={metadata} />
    case 'metrics':
      return <MetricsContentComponent content={content} />
    case 'list':
      return <ListContentComponent content={content} />
    case 'comparison':
      return <ComparisonContentComponent content={content} />
    default:
      return (
        <div className="text-text-secondary italic">
          Unknown content type: {type}
        </div>
      )
  }
}

export default SubBrief
