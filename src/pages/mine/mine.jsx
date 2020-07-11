import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import './mine.scss'

import Floater from '../../components/Floater'
import { getCurrentUser, logout } from '../../utils/login'

export default class Mine extends Component {
  state = {
    currentUser: null
  }

  componentWillMount() {}

  async componentDidMount() {
    this.setState({
      currentUser: await getCurrentUser()
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      confirmColor: '#BA2C28',
      confirmText: '退出登录',
      success: res => {
        if (res.confirm) {
          this.doLogout()
        }
      }
    })
  }

  render() {
    const { currentUser } = this.state
    if (!currentUser) {
      return null
    }
    const { nickName, avatarUrl, mobilePhoneNumber } = currentUser
    return (
      <View className='page mine'>
        <View className='header'>
          <View className='avatar_wrapper'>
            <Image className='avatar' src={avatarUrl} />
          </View>
          <View className='user_info'>
            <Text className='nick_name'>{nickName}</Text>
            <Text className='phone_number'>{mobilePhoneNumber}</Text>
          </View>
        </View>
        <View className='content'>
          <View className='main'>
            <Text>内容在这里</Text>
          </View>
        </View>
        <Floater
          image={require('../../assets/logout.png')}
          onClick={this.onLogoutClick}
        />
      </View>
    )
  }
}
