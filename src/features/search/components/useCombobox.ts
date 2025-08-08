import { useCallback, useEffect, useRef, useState } from 'react'

export type ComboboxFetcher<T> = (
  query: string,
  opts?: { limit?: number; signal?: AbortSignal }
) => Promise<T[]>

export type UseComboboxOptions<T> = {
  fetcher: ComboboxFetcher<T>
  minChars?: number
  limit?: number
  debounceMs?: number
  /** optional: filter results client-side before display */
  filter?: (items: T[], query: string) => T[]
}

export function useCombobox<T>(opts: UseComboboxOptions<T>) {
  const { fetcher, minChars = 2, limit = 8, debounceMs = 250, filter } = opts

  // state
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<T[]>([])
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const ignoreBlurRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<number | null>(null)

  const closeMenu = useCallback(() => {
    setOpen(false)
    setHighlight(-1)
  }, [])

  // fetch with debounce + cancellation
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      const q = query.trim()
      if (q.length < minChars) {
        setItems([])
        closeMenu()
        return
      }

      try {
        let next = await fetcher(q, { limit, signal: abortRef.current.signal })
        if (filter) next = filter(next, q)
        setItems(next)
        setOpen(next.length > 0)
        setHighlight(next.length ? 0 : -1)
      } catch {
        /* ignore AbortError */
      }
    }, debounceMs)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
      abortRef.current?.abort()
    }
  }, [query, minChars, limit, debounceMs, fetcher, filter, closeMenu])

  // click-away (capturing)
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const t = e.target as Node
      const inInput = !!inputRef.current && inputRef.current.contains(t)
      const inList = !!listRef.current && listRef.current.contains(t)
      if (!inInput && !inList) closeMenu()
    }
    document.addEventListener('pointerdown', handler, { capture: true })
    return () =>
      document.removeEventListener('pointerdown', handler, {
        capture: true,
      } as any)
  }, [closeMenu])

  // popstate -> close
  useEffect(() => {
    const onPop = () => closeMenu()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [closeMenu])

  // keyboard handlers
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      if (items.length) setOpen(true)
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (items.length) setHighlight((h) => (h + 1) % items.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (items.length)
          setHighlight((h) => (h - 1 + items.length) % items.length)
        break
      case 'Escape':
        closeMenu()
        break
    }
  }

  // blur that respects list clicks
  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (ignoreBlurRef.current) {
      ignoreBlurRef.current = false
      return
    }
    setTimeout(() => closeMenu(), 0)
  }

  return {
    // state
    query,
    setQuery,
    items,
    open,
    highlight,
    setHighlight,
    // refs (wire to DOM)
    inputRef,
    listRef,
    ignoreBlurRef,
    // events
    onKeyDown,
    onBlur,
    // controls
    closeMenu,
  }
}
