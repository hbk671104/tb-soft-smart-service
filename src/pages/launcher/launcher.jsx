import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
      </View>
    )
  }
}
