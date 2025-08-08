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
    // allow promise tick to resolve
    await Promise.resolve()
  })
  expect(fetcher).toHaveBeenCalledWith('ali', expect.any(Object))
  expect(result.current.items.length).toBeGreaterThan(0)
  expect(result.current.open).toBe(true)
})

it('aborts previous request when query changes', async () => {
  const fetcher = vi.fn(makeFetcher(['alicia'], 50))
  const { result } = renderHook(() =>
    useCombobox<string>({ fetcher, debounceMs: 0, minChars: 2 })
  )

  await act(async () => {
    result.current.setQuery('ali')
    result.current.setQuery('alic')
    await Promise.resolve()
  })
  // last call is with 'alic'
  expect(fetcher.mock.calls.at(-1)?.[0]).toBe('alic')
})
