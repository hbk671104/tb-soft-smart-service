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
      Taro.showLoading({ title: '登录中...' })
      const res = await wechatLogin()
      // to-do pass on the code
      Taro.reLaunch({
        url: '../index/index'
      })
    } catch (error) {
      console.log(error)
    } finally {
      Taro.hideLoading()
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
          <View className='input-group'>
            <View className='input-container'>
              <Input
                adjustPosition
                autoFocus
                className='input'
                placeholderClass='input-placeholder'
                placeholder='请输入手机号'
                type='number'
                confirmType='search'
                onConfirm={this.onConfirm}
              />
            </View>
            <View className='sms-input-container'>
              <View className='input-container' style='flex:1;'>
                <Input
                  adjustPosition
                  className='input'
                  placeholderClass='input-placeholder'
                  placeholder='请输入验证码'
                  type='number'
                  confirmType='search'
                  onConfirm={this.onConfirm}
                />
              </View>
              <View className='sms-button-container'>
                <Button className='sms-button'>
                  发送验证码
                </Button>
              </View>
            </View>
          </View>
        </View>
        <View className='button-group'>
          <Button
            className='login-button'
            hoverClass='login-button-hover'
            onClick={this.onLoginClick}
          >
            登录
          </Button>
        </View>
      </View>
    )
  }
}
