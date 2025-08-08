export type Hcp = {
  id: string
  npi?: string
  firstName: string
  lastName: string
  specialty: string
  city: string
  state: string
  organization?: string
  territoryIds?: string[]
  active?: boolean
}
