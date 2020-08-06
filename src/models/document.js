import {
  buildFile,
  buildDocument,
  constructSearchQuery
} from '../utils/leancloud'

export default {
  namespace: 'document',
  state: {
    data: null
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload
      }
    }
  },
  effects: {
    *fetch({ path, callback }, { call, put }) {
      try {
        const query = constructSearchQuery('Document')
        query.equalTo('path', path)

        let docs = yield call(async () => await query.find())
        docs = docs.map(i => i.toJSON())

        yield put({
          type: 'save',
          payload: docs
        })
        if (callback) {
          yield call(callback)
        }
      } catch (error) {
        console.error(error)
      }
    },
    *upload({ payload, path, callback }, { call, all }) {
      try {
        yield all(
          payload.map(
            ({ name, path: filePath }) => call(async () => {
              let file = buildFile(name, filePath)
              file = await file.save({ keepFileName: true })
              let doc = buildDocument(file, path)
              doc = await doc.save()
              return doc.toJSON()
            })
          )
        )
        // fetch 
        yield put({
          type: 'fetch',
          path
        })
        if (callback) {
          yield call(callback)
        }
      } catch (err) {
        console.error(err)
      }
    },
  }
}
