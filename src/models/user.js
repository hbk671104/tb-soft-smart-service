import Taro from '@tarojs/taro'
import {
  requestSMSCode,
  smsLogin,
  initCurrentUser,
  getCurrentUser
} from '../utils/login'

export default {
  namespace: 'user',
  state: {
    current: null,
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
    }
  },
  effects: {
    *checkLoginStatus({ callback }, { call, put }) {
      try {
        let user = yield call(getCurrentUser)
        if (user) {
          user = yield call(initCurrentUser, user)
          yield put({
            type: 'saveCurrent',
            payload: user
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
        yield put({
          type: 'saveCurrent',
          payload: user
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
    *fetchUploadReport({ }, { call, select }) {
      try {
        const user = yield select(state => state.user.current)

      } catch (error) {
        console.error(error)
      }
    }
  },
};