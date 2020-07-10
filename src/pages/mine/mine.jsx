import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './mine.scss'

import { getCurrentUser, logout } from '../../utils/login'

export default class Mine extends Component {

  componentWillMount() { }

  componentDidMount() {
    this.currentUser = getCurrentUser().toJSON()
    console.log(this.currentUser)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#BA2C28',
    navigationBarTextStyle: 'white'
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
      <View className='page mine'>
        <Text>我的页面这，还是得听我的</Text>
        <View>
          <Button onClick={this.onLogoutClick}>退出登录</Button>
        </View>
      </View>
    )
  }
}
