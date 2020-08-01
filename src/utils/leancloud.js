import AV from 'leancloud-storage/dist/av-weapp.js'
import { LEANCLOUD_APP_ID, LEANCLOUD_APP_KEY } from './constant'
import { avObjectMultiSet } from './util'

export const init = () => {
  AV.init({
    appId: LEANCLOUD_APP_ID,
    appKey: LEANCLOUD_APP_KEY,
    serverURLs: 'https://ocwjrild.lc-cn-n1-shared.com'
  })
}

export const constructSearchQueryObject = query_string => {
  const queryObject = new AV.SearchQuery('ErrorReport')
  queryObject.queryString(query_string)
  queryObject.limit(15)
  queryObject.addDescending('updatedAt')
  queryObject.addDescending('createdAt')
  return queryObject
}

export const constructReportObject = form => {
  const report = new AV.Object('ErrorReport')
  return avObjectMultiSet(form)(report)
}

export const constructSearchQuery = () => {
  const queryObject = new AV.Query('ErrorReport')
  queryObject.addDescending('updatedAt')
  queryObject.addDescending('createdAt')
  return queryObject
}

export const constructReportObjectToWrite = id => {
  return AV.Object.createWithoutData('ErrorReport', id)
}

export const buildDocument = (name, path) => {
  return new AV.File(name, { blob: { uri: path } })
}

export const buildDocumentToDelete = id => {
  return AV.File.createWithoutData(id)
}
