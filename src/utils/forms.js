export function getFormData(data) {
  const dataSend = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (key && value) {
      if (Array.isArray(value)) {
        value.forEach((elm) => dataSend.append(key, elm))
      } else {
        dataSend.set(key, value)
      }
    }
  })
  return dataSend
}
