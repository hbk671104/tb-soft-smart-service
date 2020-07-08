import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './login.scss'

import { requestSMSCode, smsLogin } from '../../utils/login'

const COUNTDOWN_LENGTH = 30

export default class Login extends Component {

  state = {
    phone_number: null,
    sms_code: null,
    countdown: COUNTDOWN_LENGTH
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '用户登录'
  }

  login = async (number, code) => {
    try {
      Taro.showLoading({ title: '登录中...' })
      await smsLogin(number, code)
      Taro.reLaunch({
        url: '../index/index'
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  getSMSCode = async number => {
    try {
      Taro.showLoading({ title: '获取验证码...' })
      await requestSMSCode(number)
      this.startCountdown()
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  startCountdown = () => {
    const countdownInterval = setInterval(() => {
      this.setState(prevState => {
        if (this.state.countdown === 0) {
          clearInterval(countdownInterval)
          return {
            countdown: COUNTDOWN_LENGTH
          }
        }
        return {
          countdown: prevState.countdown - 1
        }
      })
    }, 1000)
  }

  onPhoneNumberInput = ({ detail }) => {
    this.setState({
      phone_number: detail.value
    })
  }

  onSMSCodeInput = ({ detail }) => {
    this.setState({
      sms_code: detail.value
    })
  }

  onSMSRequestClick = e => {
    e.stopPropagation()
    this.getSMSCode(this.state.phone_number)
  }

  onLoginClick = e => {
    e.stopPropagation()
    this.login(this.state.phone_number, this.state.sms_code)
  }

  render() {
    const { countdown } = this.state
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
                confirmType='next'
                onInput={this.onPhoneNumberInput}
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
                  confirmType='done'
                  onInput={this.onSMSCodeInput}
                />
              </View>
              <View className='sms-button-container'>
                <Button className='sms-button' onClick={this.onSMSRequestClick}>
                  {countdown === COUNTDOWN_LENGTH ? '发送验证码' : `${countdown}秒后重试`}
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
