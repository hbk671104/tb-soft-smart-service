import {
  constructReportObjectToWrite,
  constructSearchQuery,
  constructReportObject
} from '../utils/leancloud'

export default {
  namespace: 'report',
  state: {
    search: {
      hit: null,
      data: null
    },
    detail: null
  },
  reducers: {
    saveSearch(state, { payload }) {
      return {
        ...state,
        search: payload
      }
    },
    removeSearch(state) {
      return {
        ...state,
        search: {
          hit: null,
          data: null
        }
      }
    },
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
    *search({ object, callback, complete }, { select, call, put }) {
      try {
        let reports = yield call(async () => await object.find())
        reports = reports.map(r => r.toJSON())
        const currentHits = yield select(state => state.report.search.hits)
        const currentData = yield select(state => state.report.search.data)
        if (currentHits) {
          yield put({
            type: 'saveSearch',
            payload: {
              hits: currentHits,
              data: [...currentData, ...reports]
            }
          })
        } else {
          yield put({
            type: 'saveSearch',
            payload: {
              hits: object.hits(),
              data: reports
            }
          })
        }

        if (callback) {
          yield call(callback)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (complete) {
          yield call(complete)
        }
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
    *create({ payload, callback }, { call, put }) {
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