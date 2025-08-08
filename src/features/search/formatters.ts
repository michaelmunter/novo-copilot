import type { Hcp } from './types'

export const formatName = (h: Hcp) => `${h.lastName}, ${h.firstName}`

/** Returned string that we place back in the input when a row is picked */
export const buildQueryFromHcp = (h: Hcp) =>
  `${formatName(h)} • ${h.specialty} • ${h.city}`
