import AV from 'leancloud-storage/dist/av-weapp.js';

const query = async (value) => {
  const query = new AV.SearchQuery('ErrorReport')
  query.queryString(value)
  return await query.find()
}

export default query