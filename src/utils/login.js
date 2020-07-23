import Taro from '@tarojs/taro'
import AV from 'leancloud-storage/dist/av-weapp.js'
import { WEAPP_ID, WEAPP_KEY } from './constant'
import { avObjectMultiSet } from './util'

export const wechatLogin = async () => {
  try {
    const { code } = await Taro.login()
    const res = await AV.Cloud.run('code2Session', {
      appid: WEAPP_ID,
      secret: WEAPP_KEY,
      js_code: code
    })
    // const user = await AV.User.loginWithAuthData({
    //   openid,
    //   access_token,
    //   expires_in: 7200
    // }, 'wechat')
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const requestSMSCode = async number => {
  try {
    const res = await AV.User.requestLoginSmsCode(number)
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const smsLogin = async ({ number, code, misc = {} }) => {
  try {
    let user = await AV.User.logInWithMobilePhoneSmsCode(number, code)
    user = avObjectMultiSet(misc)(user)
    user = await user.save()
    return Promise.resolve(user)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const initCurrentUser = async user => {
  try {
    let roles = await user.getRoles()
    user = user.toJSON()
    user.roles = roles.map(r => r.getName())
    return Promise.resolve(user)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getCurrentUser = () => {
  return AV.User.current()
}

export const logout = async () => {
  try {
    const res = await AV.User.logOut()
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(error)
  }
}
