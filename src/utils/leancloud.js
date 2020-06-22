import AV from 'leancloud-storage/dist/av-weapp.js'

export const constructQueryObject = query_string => {
  const queryObject = new AV.SearchQuery('ErrorReport')
  queryObject.queryString(query_string)
  queryObject.limit(15)
  return queryObject
}

export const constructReportObject = form_data => {
  const report = new AV.Object('ErrorReport')
  Object.keys(form_data).forEach(k => {
    const value = form_data[k]
    if (value) {
      report.set(k, value)
    }
  })
  return report
}

export const constructObjectToDelete = id => {
  return AV.Object.createWithoutData('ErrorReport', id);
}
