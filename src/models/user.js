import Taro from '@tarojs/taro'
import {
  requestSMSCode,
  smsLogin,
  initCurrentUser,
  getCurrentUser
} from '../utils/login'
import { constructSearchQuery } from '../utils/leancloud'
import { deleteItemFromArray, updateItemFromArray } from '../utils/util'

export default {
  namespace: 'user',
  state: {
    current: null,
    report: {
      upload: null,
      footprint: null
    },
    temp: {
      last_edit_at: null,
      data: null
    }
  },
  reducers: {
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: payload
      };
    },
    removeCurrent(state) {
      return {
        ...state,
        current: null
      }
    },
    saveUploadReport(state, { payload }) {
      return {
        ...state,
        report: {
          ...state.report,
          upload: payload
        }
      }
    },
    saveFootprint(state, { payload }) {
      if (Array.isArray(payload)) {
        return {
          ...state,
          report: {
            ...state.report,
            footprint: payload
          }
        }
      }
      // buffer
      let footprint = state.report.footprint || []
      if (footprint.length === 100) {
        footprint.pop()
      }
      // remove duplicate
      footprint = footprint.filter(i => i.data.objectId !== payload.data.objectId)
      footprint.unshift(payload)

      return {
        ...state,
        report: {
          ...state.report,
          footprint
        }
      }
    },
    saveTemp(state, { payload }) {
      return {
        ...state,
        temp: payload
      }
    },
    removeTemp(state) {
      return {
        ...state,
        temp: {
          last_edit_at: null,
          data: null
        }
      };
    },
  },
  effects: {
    *checkLoginStatus({ callback }, { call, put }) {
      try {
        let user = yield call(getCurrentUser)
        if (user) {
          user = yield call(initCurrentUser, user)
          yield put.resolve({
            type: 'global/init',
            user
          })
        }

        if (callback) {
          yield call(callback, !!user)
        }
      } catch (error) {
        console.error(error)
      }
    },
    *requestSMSCode({ payload, callback }, { call }) {
      try {
        const { number } = payload
        yield call(requestSMSCode, number)

        if (callback) {
          yield call(callback)
        }
      } catch (error) {
        Taro.showToast({
          title: error.message,
          icon: 'none'
        })
      }
    },
    *smsLogin({ payload, callback }, { call, put }) {
      try {
        let user = yield call(smsLogin, payload)
        user = yield call(initCurrentUser, user)
        yield put.resolve({
          type: 'global/init',
          user
        })

        if (callback) {
          yield call(callback)
        }
      } catch (error) {
        Taro.showToast({
          title: error.message,
          icon: 'none'
        })
      }
    },
    *fetchUploadReport(_, { put, call, select }) {
      try {
        const { username } = yield select(state => state.user.current)
        const query = constructSearchQuery()
        query.equalTo('technican', username)

        let uploadReports = yield call(async () => await query.find())
        uploadReports = uploadReports.map(i => i.toJSON())

        yield put({
          type: 'saveUploadReport',
          payload: uploadReports
        })
      } catch (error) {
        console.error(error)
      }
    },
    *deleteItemFromReport({ id }, { all, put, select }) {
      try {
        let uploadReports = yield select(state => state.user.report.upload)
        uploadReports = deleteItemFromArray(uploadReports, id)
        let footprintReports = yield select(state => state.user.report.footprint)
        footprintReports = deleteItemFromArray(footprintReports, id)

        yield all([
          put({
            type: 'saveUploadReport',
            payload: uploadReports
          }),
          put({
            type: 'saveFootprint',
            payload: footprintReports
          })
        ])
      } catch (error) {
        console.error(error)
      }
    },
    *updateItemFromReport({ payload }, { all, put, select }) {
      try {
        let uploadReports = yield select(state => state.user.report.upload)
        uploadReports = updateItemFromArray(uploadReports, payload)
        let footprintReports = yield select(state => state.user.report.footprint)
        footprintReports = updateItemFromArray(footprintReports, payload)

        yield all([
          put({
            type: 'saveUploadReport',
            payload: uploadReports
          }),
          put({
            type: 'saveFootprint',
            payload: footprintReports
          })
        ])
      } catch (error) {
        console.error(error)
      }
    }
  },
};