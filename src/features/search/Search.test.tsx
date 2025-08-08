// features/search/Search.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'
import { hcpMockService } from './mock'
import { vi } from 'vitest'

function setup(onSearch = vi.fn()) {
  render(<Search onSearch={onSearch} service={hcpMockService} />)
  const input = screen.getByRole('combobox', { name: /search/i })
  const button = screen.getByRole('button', { name: /search/i })
  return { input, button, onSearch }
}

it('shows suggestions and commits selection with Enter', async () => {
  const user = userEvent.setup()
  const { input, onSearch } = setup()

  await user.type(input, 'ali') // reaches minChars
  // listbox appears
  const list = await screen.findByRole('listbox')
  const options = await screen.findAllByRole('option')
  expect(options.length).toBeGreaterThan(0)

  // ArrowDown then Enter to pick first
  await user.keyboard('{ArrowDown}{Enter}')
  expect(onSearch).toHaveBeenCalledTimes(1)
  // suggestions close
  expect(list).not.toBeInTheDocument()
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
