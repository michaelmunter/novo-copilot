export type SubBriefData = {
  title: string
  type: 'text' | 'table' | 'chart' | 'metrics' | 'list' | 'comparison'
  content: any // Flexible content structure based on type
  metadata?: {
    // Only add properties when actually needed
    xAxis?: string
    yAxis?: string
    chartType?: 'line' | 'bar' | 'pie'
    highlight?: boolean
    size?: 'small' | 'medium' | 'large'
  }
}

export type BriefingData = {
  id: string
  name: string
  subBriefs: SubBriefData[]
  lastUpdated: string
}

// Content type definitions for better intellisense
export type TextContent = {
  text: string
  highlights?: string[]
}

export type TableContent = {
  headers: string[]
  rows: string[][]
  summary?: string
}

export type ChartContent = {
  data: Array<{ x: any; y: any; label?: string }>
}

export type MetricsContent = Array<{
  label: string
  value: string
  trend?: 'up' | 'down' | 'flat'
  color?: string
}>

export type ListContent = string[]

export type ComparisonContent = Array<{
  name: string
  value: string
  status?: 'good' | 'warning' | 'error'
  note?: string
}>
