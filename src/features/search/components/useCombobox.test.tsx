// features/search/components/useCombobox.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useCombobox, type ComboboxFetcher } from './useCombobox'
import { vi, expect, it } from 'vitest'

function makeFetcher(results: string[], delay = 0): ComboboxFetcher<string> {
  return (q, opts) =>
    new Promise((res, rej) => {
      const t = setTimeout(
        () => res(results.filter((r) => r.includes(q))),
        delay
      )
      opts?.signal?.addEventListener('abort', () => {
        clearTimeout(t)
        rej(new DOMException('Aborted', 'AbortError'))
      })
    })
}

vi.useFakeTimers()

it('debounces fetch and opens with results', async () => {
  const fetcher = vi.fn(makeFetcher(['alicia', 'brian', 'cynthia']))
  const { result } = renderHook(() =>
    useCombobox<string>({ fetcher, debounceMs: 250, minChars: 2 })
  )

  act(() => result.current.setQuery('al'))
  expect(fetcher).not.toHaveBeenCalled()

  // fast typing replaces the query before debounce fires
  act(() => result.current.setQuery('ali'))
  vi.advanceTimersByTime(249)
  expect(fetcher).not.toHaveBeenCalled()

  // cross debounce threshold
  await act(async () => {
    vi.advanceTimersByTime(1)
    // run pending timers including fetcher resolution (delay 0)
    vi.runAllTimers()
    // allow microtasks to flush state updates
    await Promise.resolve()
  })
  expect(fetcher).toHaveBeenCalledWith('ali', expect.any(Object))
  expect(result.current.items.length).toBeGreaterThan(0)
  // not focused yet → open stays false
  expect(result.current.open).toBe(false)
  // focusing should open when items are present
  act(() => result.current.onFocus({} as any))
  expect(result.current.open).toBe(true)
})

it('aborts previous request when query changes', async () => {
  const fetcher = vi.fn(makeFetcher(['alicia'], 50))
  const { result } = renderHook(() =>
    useCombobox<string>({ fetcher, debounceMs: 0, minChars: 2 })
  )

  // queue updates
  await act(async () => {
    result.current.setQuery('ali')
    result.current.setQuery('alic')
    // allow effects to schedule timers
    await Promise.resolve()
  })
  // flush debounce(0) and fetcher timers
  vi.runAllTimers()
  await act(async () => {
    await Promise.resolve()
  })
  // verify latest invocation was with 'alic'
  expect(fetcher).toHaveBeenCalled()
  const calls = fetcher.mock.calls.map((c) => c[0])
  expect(calls.includes('alic')).toBe(true)
})
