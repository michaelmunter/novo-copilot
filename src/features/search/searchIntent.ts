// src/features/search/searchIntent.ts
export type SearchIntent =
  | { type: 'hcp'; query: string }
  | { type: 'command'; name: 'read_briefing' }

/** MVP: default everything to HCP, with a tiny command heuristic */
export function searchIntent(input: string): SearchIntent {
  const q = input.trim()
  if (!q) return { type: 'hcp', query: '' }

  // Simple command: "read briefing", "read the briefing", "read it"
  if (
    /^\s*read(\s+the)?\s+briefing\s*$/i.test(q) ||
    /^\s*read it\s*$/i.test(q)
  ) {
    return { type: 'command', name: 'read_briefing' }
  }

  return { type: 'hcp', query: q }
}
