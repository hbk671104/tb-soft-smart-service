import AV from 'leancloud-storage/dist/av-weapp.js'
import { LEANCLOUD_APP_ID, LEANCLOUD_APP_KEY } from './constant'

export const initLeanCloud = () => {
  AV.init({
    appId: LEANCLOUD_APP_ID,
    appKey: LEANCLOUD_APP_KEY,
    serverURLs: 'https://ocwjrild.lc-cn-n1-shared.com'
  })
}

initLeanCloud()
