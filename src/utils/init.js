import AV from 'leancloud-storage/dist/av-weapp.js'

const init = () => {
  AV.init({
    appId: 'OcwJRildb8NvppJATzwgN5ma-gzGzoHsz',
    appKey: 'NFViCLzx9k3lWroAu2QjzGI6',
    serverURLs: 'https://ocwjrild.lc-cn-n1-shared.com'
  })
}

export default init
