import AV from 'leancloud-storage/dist/av-weapp.js'

export const constructQueryObject = value => {
  const queryObject = new AV.SearchQuery('ErrorReport')
  queryObject.queryString(value)
  queryObject.limit(15)
  return queryObject
}
