import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './login.scss'

import { wechatLogin } from '../../utils/init'

export default class Login extends Component {

  componentWillMount() { }

  componentDidMount() {
    // this.login()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  login = async () => {
    try {
      const { code } = await wechatLogin()
      console.log(code)
      Taro.redirectTo({
        url: '../index/index'
      })
    } catch (error) {
      console.log(error)
    }
  }

  onLoginClick = e => {
    e.stopPropagation()
    this.login()
  }

  render() {
    return (
      <View className='page login'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <View className='button-group'>
          <Button type='primary' onClick={this.onLoginClick}>登录</Button>
        </View>
      </View>
    )
  }
}
