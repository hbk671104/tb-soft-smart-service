import {
  constructReportObjectToWrite,
  constructSearchQuery,
  constructReportObject
} from '../utils/leancloud'

export default {
  namespace: 'report',
  state: {
    search: null,
    detail: null
  },
  reducers: {
    saveDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
      };
    },
    removeDetail(state) {
      return {
        ...state,
        detail: null
      };
    },
  },
  effects: {
    *search(_, { all, call, put }) {
      try {
      } catch (err) {
        console.log(err)
      }
    },
    *get({ id, callback, complete }, { call, put }) {
      try {
        const query = constructSearchQuery()
        let report = yield call(async () => await query.get(id))
        report = report.toJSON()

        if (callback) {
          yield call(callback, report)
        } else {
          yield put({
            type: 'saveDetail',
            payload: report
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (complete) {
          yield call(complete)
        }
      }
    },
    *delete({ id, callback }, { call, put }) {
      try {
        const object = constructReportObjectToWrite(id)
        yield call(async () => await object.destroy())
        // delete from my report list
        yield put({
          type: 'user/deleteItemFromReport',
          id
        })

        if (callback) {
          yield call(callback)
        }
      } catch (error) {
        console.error(error)
      }
    },
    *create({ payload, callback }, { call }) {
      try {
        const report = constructReportObject(payload)
        let result = yield call(async () => await report.save())
        result = result.toJSON()
        yield put({
          type: 'user/fetchUploadReport'
        })

        if (callback) {
          yield call(callback, result)
        }
      } catch (error) {
        console.log(error)
      }
    },
    *update({ object, callback }, { call, put, all }) {
      try {
        // TODO: set all the shit
        let report = yield call(async () => await object.save())
        report = report.toJSON()
        yield all([
          // reload detail
          put({
            type: 'get',
            id: report.objectId
          }),
          // update my report list
          put({
            type: 'user/updateItemFromReport',
            payload: report
          })
        ])

        if (callback) {
          yield call(callback)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
};