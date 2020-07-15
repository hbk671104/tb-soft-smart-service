import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './launcher.scss'
import { isLoggedIn, setCurrentUser, initCurrentUser } from '../../utils/login'

export default class Launcher extends Component {
  componentWillMount() {}

  async componentDidMount() {
    // check login status
    const loggedIn = isLoggedIn()
    if (loggedIn) {
      const user = await initCurrentUser()
      setCurrentUser(user)
      Taro.reLaunch({
        url: '../index/index'
      })
    } else {
      Taro.reLaunch({
        url: '../login/login'
      })
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='page launcher'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <View className='content'>
          <AtActivityIndicator size={48} color='#BA2C28' />
        </View>
      </View>
    )
  }
}
