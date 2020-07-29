import Taro from '@tarojs/taro'
import { persistStore } from 'redux-persist';
import { get as getGlobalData } from './global'

const engine = {
  getItem(key, callback) {
    const data = Taro.getStorageSync(key)
    if (callback) {
      callback(null, data)
    }
  },
  setItem(key, data, callback) {
    Taro.setStorageSync(key, data)
    if (callback) {
      callback()
    }
  },
  removeItem(key, callback) {
    Taro.removeStorageSync(key)
    if (callback) {
      callback()
    }
  },
  getAllKeys(callback) {
    const { keys } = Taro.getStorageInfoSync()
    if (callback) {
      callback(null, keys)
    }
  }
}

const persist = () => {
  const dva = getGlobalData('dva')
  const store = dva.getStore()
  return new Promise((resolve) => {
    persistStore(store, {
      whitelist: ['user'],
      storage: engine
    }, () => {
      resolve()
    })
  })
}

export default persist