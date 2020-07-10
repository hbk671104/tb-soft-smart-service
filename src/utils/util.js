export const avObjectMultiSet = data => object => {
  if (data) {
    Object.keys(data).forEach(k => {
      const value = data[k]
      if (value) {
        object.set(k, value)
      }
    })
    return object
  }
  return object
}