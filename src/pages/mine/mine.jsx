import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './mine.scss'

import { logout } from '../../utils/login'

export default class Mine extends Component {

  componentWillMount() { }

  componentDidMount() {
    // this.fetchUserInfo()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '我的'
  }

  fetchUserInfo = async () => {
    try {
      const { authSetting } = await Taro.getSetting()
      if (authSetting['scope.userInfo']) {
        const info = await Taro.getUserInfo()
      } else {
        const result = await Taro.authorize({
          scope: 'scope.userInfo'
        })
        console.log('Auth Result', result)
      }
    } catch (error) {
      console.error('Fetch UserInfo', error)
    }
  }

  doLogout = async () => {
    try {
      Taro.showLoading({ title: '正在登出...' })
      await logout()
      Taro.reLaunch({
        url: '../login/login'
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  onLogoutClick = e => {
    e.stopPropagation()
    this.doLogout()
  }

  render() {
    return (
      <View className='mine'>
        <Text>我的页面这，还是得听我的</Text>
        <Button onClick={this.onLogoutClick}>退出登录</Button>
      </View>
    )
  }
}
