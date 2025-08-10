// features/search/Search.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'
import { hcpMockService } from './mock'
import { vi, expect, it } from 'vitest'

function setup(onSearchResult = vi.fn()) {
  render(<Search onSearchResult={onSearchResult} hcpService={hcpMockService} />)
  // Input does not expose an accessible name; target by placeholder or role only
  const input = screen.getByPlaceholderText(/search by name/i)
  const button = screen.getByRole('button', { name: /search/i })
  return { input, button, onSearchResult }
}

it('shows suggestions and commits selection on click', async () => {
  const user = userEvent.setup()
  const { input, onSearchResult } = setup()

  await user.type(input, 'ali') // reaches minChars
  // listbox appears
  await screen.findByRole('listbox')
  const options = await screen.findAllByRole('option')
  expect(options.length).toBeGreaterThan(0)

  // Click first suggestion to commit
  await user.click(options[0])
  expect(onSearchResult).toHaveBeenCalledTimes(1)
  // suggestions close
  await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull())
})

it('click-away closes suggestions', async () => {
  const user = userEvent.setup()
  const { input } = setup()
  await user.type(input, 'ali')
  await screen.findByRole('listbox')

  // click body to trigger capturing listener
  await user.click(document.body)
  expect(screen.queryByRole('listbox')).toBeNull()
})
