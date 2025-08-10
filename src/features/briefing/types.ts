export type Brief = {
  // Identity
  hcpId?: string
  name?: string
  info?: string

  // Person & role
  specialty?: string
  credentials?: string
  yearsExperience?: number
  languages?: string[]

  // Location & org
  primaryLocation?: {
    name?: string
    address?: string
    phone?: string
    department?: string
  }
  affiliations?: Array<{ orgName?: string }>

  // Segmentation & panel
  segmentation?: { segment?: string; decile?: number; targetingTier?: string }
  panels?: {
    totalPatients?: number
    payerMix?: Array<{ payer: string; percent: number }>
  }

  // Preferences & consent
  preferences?: {
    channels?: string[]
    bestTimes?: string[]
    notes?: string
  }
  consent?: { approvedEmail?: boolean; consentDate?: string }

  // Sampling eligibility
  sampling?: {
    isEligible?: boolean
    stateLicenseValid?: boolean
    deaValid?: boolean
  }

  // Recent interactions
  recentCalls?: Array<{
    date: string
    rep?: string
    summary?: string
    objections?: string[]
    actionItems?: string[]
  }>
  recentEmails?: Array<{
    date: string
    subject?: string
    opened?: boolean
    clicked?: boolean
  }>
  clmContent?: Array<{
    contentName: string
    date: string
    durationSec?: number
  }>
  eventHistory?: Array<{ name: string; date: string; role?: string }>

  // Sales & access
  sales?: {
    ytdRevenue?: number
    last90dUnits?: number
    products?: Array<{
      product: string
      ytdUnits?: number
      trend?: 'up' | 'down' | 'flat'
      lastOrderDate?: string
    }>
    targets?: Array<{
      product: string
      ytdTargetUnits?: number
      gapToTargetUnits?: number
    }>
  }
  formulary?: Array<{
    plan: string
    status: string
    lastUpdated?: string
  }>

  // AI summary (rendered as "Today’s plan" in UI)
  nba?: {
    message?: string
    rationale?: string
    riskFlags?: string[]
    suggestedArtifacts?: string[]
  }

  // Facility scenario (hospital/clinic) & contacts
  facility?: {
    name: string
    address?: string
    phone?: string
    bedCount?: number
    department?: string
  }
  contacts?: Array<{
    contactId: string
    name: string
    role?: string
    specialty?: string
    influence?: 'high' | 'medium' | 'low'
    preferences?: { channels?: string[]; bestTimes?: string[] }
  }>

  // Logistics & policies
  logistics?: {
    officeHours?: string
    visitPreferences?: string
    gatekeepers?: string[]
    policies?: string[]
  }
}
