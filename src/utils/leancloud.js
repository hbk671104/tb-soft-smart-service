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

export const constructSearchQueryObject = queryString => {
  const queryObject = new AV.SearchQuery('ErrorReport')
  queryObject.queryString(queryString)
  queryObject.limit(15)
  queryObject.addDescending('updatedAt')
  queryObject.addDescending('createdAt')
  return queryObject
}

export const constructReportObject = form => {
  const report = new AV.Object('ErrorReport')
  return avObjectMultiSet(form)(report)
}

export const constructSearchQuery = (targetClass = 'ErrorReport') => {
  const queryObject = new AV.Query(targetClass)
  queryObject.addDescending('updatedAt')
  queryObject.addDescending('createdAt')
  return queryObject
}

export const constructReportObjectToWrite = id => {
  return AV.Object.createWithoutData('ErrorReport', id)
}

export const buildFile = (name, path) => {
  return new AV.File(name, { blob: { uri: path } })
}

export const buildDocument = (file, path) => {
  const doc = new AV.Object('Document')
  doc.set('path', path)
  doc.set('file', file)
  return doc
}

export const buildFileToDelete = id => {
  return AV.File.createWithoutData(id)
}
