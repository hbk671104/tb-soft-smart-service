import Taro from '@tarojs/taro'
import {
  buildFile,
  buildDocument,
  buildDocumentToDelete,
  buildFileToDelete,
  constructSearchQuery
} from '../utils/leancloud'

export default {
  namespace: 'document',
  state: {
    current: {
      name: null,
      category: null
    },
    data: null
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload
      }
    },
    saveCategory(state, { payload }) {
      return {
        ...state,
        current: payload
      }
    }
  },
  effects: {
    *fetch({ category, callback }, { call, put }) {
      try {
        const query = constructSearchQuery('Document')
        query.equalTo('category', category)

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
    *upload({ payload, category, callback }, { put, call, all }) {
      try {
        yield all(
          payload.map(
            ({ name, path }) => call(async () => {
              let file = buildFile(name, path)
              file = await file.save({ keepFileName: true })
              let doc = buildDocument(file, category)
              doc = await doc.save()
              return doc.toJSON()
            })
          )
        )
        // fetch 
        yield put({
          type: 'fetch',
          category
        })
        if (callback) {
          yield call(callback)
        }
      } catch (err) {
        console.error(err)
      }
    },
    *download({ payload, fail, complete }, _) {
      const { name, url } = payload
      try {
        Taro.downloadFile({
          url: url.replace(/^http/, 'https'),
          filePath: `${Taro.env.USER_DATA_PATH}/${name}`,
          success: async ({ filePath }) => {
            try {
              await Taro.openDocument({
                filePath
              })
            } catch (error) {
              fail(error.errMsg)
            }
          },
          fail: error => {
            fail(error.errMsg)
          },
          complete: () => {
            if (complete) {
              complete()
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    *delete({ payload, category }, { call, put }) {
      try {
        const doc = buildDocumentToDelete(payload.objectId)
        const file = buildFileToDelete(payload.file.objectId)
        yield call(async () => await doc.destroy())
        yield call(async () => await file.destroy())

        yield put({
          type: 'fetch',
          category
        })
      } catch (error) {
        console.error(error)
      }
    },
    *changeCategory({ payload }, { put }) {
      try {
        yield put({
          type: 'saveCategory',
          payload
        })
        yield put({
          type: 'fetch',
          category: payload.category
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
