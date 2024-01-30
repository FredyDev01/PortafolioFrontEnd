export function generateFilterUrl(url, filter) {
  const currentURL = new URL(url, window.location.origin)
  Object.entries(filter).forEach((entry) => {
    const [key, value] = entry
    if (key && value) {
      if (Array.isArray(value)) {
        value.forEach((elm) => currentURL.searchParams.append(key, elm))
      } else {
        currentURL.searchParams.set(key, value)
      }
    }
  })
  return currentURL.pathname + currentURL.search
}
