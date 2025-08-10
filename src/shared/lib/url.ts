export const setQueryParam = (key: string, value: string) => {
  const params = new URLSearchParams(window.location.search)
  if (value) params.set(key, value)
  else params.delete(key)
  const qs = params.toString()
  const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
  window.history.pushState({}, '', newUrl)
}

export const setQueryParams = (params: Record<string, string>) => {
  const urlParams = new URLSearchParams()
  // Set parameters in specific order: hcp first, then tab
  if (params.hcp) urlParams.set('hcp', params.hcp)
  if (params.tab) urlParams.set('tab', params.tab)
  // Add any other params
  Object.entries(params).forEach(([key, value]) => {
    if (key !== 'hcp' && key !== 'tab' && value) {
      urlParams.set(key, value)
    }
  })
  const qs = urlParams.toString()
  const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
  window.history.pushState({}, '', newUrl)
}

export const clearQueryParams = (keys: string[]) => {
  const params = new URLSearchParams(window.location.search)
  keys.forEach((key) => params.delete(key))
  const qs = params.toString()
  const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`
  window.history.pushState({}, '', newUrl)
}

export const getQueryParam = (key: string) => {
  const params = new URLSearchParams(window.location.search)
  return params.get(key) || ''
}
