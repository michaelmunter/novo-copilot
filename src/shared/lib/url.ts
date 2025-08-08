export const setQueryParam = (key: string, value: string) => {
  const params = new URLSearchParams(window.location.search)
  if (value) params.set(key, value)
  else params.delete(key)
  const qs = params.toString()
  const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
  window.history.pushState({}, '', newUrl)
}

export const getQueryParam = (key: string) => {
  const params = new URLSearchParams(window.location.search)
  return params.get(key) || ''
}
