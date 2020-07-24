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

export const deleteItemFromArray = (array, id) => array.filter(i => i.objectId !== id)
export const updateItemFromArray = (array, item) => array.map(i => {
  if (i.objectId === item.objectId) {
    return item
  }
  return i
})