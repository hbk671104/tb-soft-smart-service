import AV from 'leancloud-storage/dist/av-weapp.js';

const query = async (value) => {
  const errorDetailQuery = new AV.Query('ErrorReport')
  errorDetailQuery.contains('error_detail', value)
  const oraErrorDetailQuery = new AV.Query('ErrorReport')
  oraErrorDetailQuery.contains('ora_error_detail', value)
  const errorCauseDetailQuery = new AV.Query('ErrorReport')
  errorCauseDetailQuery.contains('error_cause_detail', value)
  const solutionDetailQuery = new AV.Query('ErrorReport')
  solutionDetailQuery.contains('solution_detail', value)

  // combine
  const query = AV.Query.or(
    errorDetailQuery, 
    oraErrorDetailQuery, 
    errorCauseDetailQuery, 
    solutionDetailQuery
  )

  // query
  return await query.find()
}

export default query