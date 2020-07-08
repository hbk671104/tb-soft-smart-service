import Taro from '@tarojs/taro'
import AV from 'leancloud-storage/dist/av-weapp.js'
import { LEANCLOUD_APP_ID, LEANCLOUD_APP_KEY, WEAPP_ID, WEAPP_KEY } from './constant'

export const initLeancloud = () => {
  AV.init({
    appId: LEANCLOUD_APP_ID,
    appKey: LEANCLOUD_APP_KEY,
    serverURLs: 'https://ocwjrild.lc-cn-n1-shared.com'
  })
}

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
