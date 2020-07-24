import {
  constructReportObjectToWrite,
  constructSearchQuery,
  constructReportObject
} from '../utils/leancloud'

export default {
  namespace: 'report',
  state: {
    search: null
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMore(state, { payload: list }) {
      return { ...state, list: [...state.list, ...list] };
    },
  },
  effects: {
    *search(_, { all, call, put }) {
      try {
      } catch (err) {
        console.log(err)
      }
    },
    *get({ id, callback, complete }, { call }) {
      try {
        const query = constructSearchQuery()
        let report = yield call(async () => await query.get(id))
        report = report.toJSON()

        if (callback) {
          yield call(callback, report)
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
    *update({ id, payload, callback }, { call, put }) {
      try {
        // TODO: set all the shit
        const object = constructReportObjectToWrite(id)
        yield call(async () => await object.save())
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
  },
};