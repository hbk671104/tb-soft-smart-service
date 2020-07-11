import AV from 'leancloud-storage/dist/av-weapp.js'
import { avObjectMultiSet } from './util'

export const constructSearchQueryObject = query_string => {
  const queryObject = new AV.SearchQuery('ErrorReport')
  queryObject.queryString(query_string)
  queryObject.limit(15)
  return queryObject
}

export const constructReportObject = form_data => {
  const report = new AV.Object('ErrorReport')
  return avObjectMultiSet(form_data)(report)
}

export const constructSearchQuery = () => {
  return new AV.Query('ErrorReport')
}

export const constructObjectToDelete = id => {
  return AV.Object.createWithoutData('ErrorReport', id)
}

export const buildDocument = (name, path) => {
  return new AV.File(name, { blob: { uri: path } })
}

export const buildDocumentToDelete = id => {
  return AV.File.createWithoutData(id)
}
