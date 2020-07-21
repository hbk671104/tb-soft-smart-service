import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Button,
  Checkbox,
  CheckboxGroup
} from '@tarojs/components'
import './login.scss'

import {
  requestSMSCode,
  smsLogin,
  setCurrentUser,
  initCurrentUser
} from '../../utils/login'

const COUNTDOWN_LENGTH = 30

export default class Login extends Component {
  state = {
    phone_number: null,
    sms_code: null,
    privacy_checked: false,
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

  doLogin = async (number, code, misc) => {
    try {
      Taro.showLoading({ title: '登录中...' })
      await smsLogin(number, code, misc)
      const user = await initCurrentUser()
      setCurrentUser(user)
      Taro.hideLoading()
      Taro.reLaunch({
        url: '../index/index'
      })
    } catch (error) {
      Taro.showToast({
        title: error.message,
        icon: 'none',
        duration: 1500
      })
    }
  }

  getSMSCode = async number => {
    try {
      Taro.showLoading({ title: '获取验证码...' })
      await requestSMSCode(number)
      Taro.hideLoading()
      this.startCountdown()
    } catch (error) {
      Taro.showToast({
        title: error.message,
        icon: 'none',
        duration: 1500
      })
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
    this.setState(
      {
        phone_number: detail.value
      },
      () => {
        // TODO: bring it back later
        // const { phone_number } = this.state
        // if (/^1\d{10}/.test(phone_number)) {
        //   this.getSMSCode(phone_number)
        // }
      }
    )
  }

  onSMSCodeInput = ({ detail }) => {
    this.setState(
      {
        sms_code: detail.value
      },
      () => {
        // TODO: bring it back later
        // const { phone_number, sms_code } = this.state
        // if (/^\d{6}/.test(sms_code)) {
        //   this.doLogin(phone_number, sms_code)
        // }
      }
    )
  }

  onSMSRequestClick = e => {
    e.stopPropagation()
    this.getSMSCode(this.state.phone_number)
  }

  onLoginClick = e => {
    e.stopPropagation()
    const { phone_number, sms_code } = this.state
    this.doLogin(phone_number, sms_code)
  }

  onGetUserInfo = ({ detail }) => {
    const { userInfo } = detail
    const { phone_number, sms_code } = this.state
    let misc = {}
    if (userInfo) {
      const { nickName, avatarUrl } = userInfo
      misc = { nickName, avatarUrl }
    }
    this.doLogin(phone_number, sms_code, misc)
  }

  onPrivacyCheckChange = ({ detail: { value } }) => {
    const [agreed] = value
    this.setState({
      privacy_checked: !!agreed
    })
  }

  onPrivacyTextClick = e => {
    e.stopPropagation()
    Taro.navigateTo({
      url: './privacy/privacy'
    })
  }

  render() {
    const { countdown, phone_number, sms_code, privacy_checked } = this.state
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
                <Button
                  className='sms-button'
                  disabled={countdown !== COUNTDOWN_LENGTH}
                  onClick={this.onSMSRequestClick}
                >
                  {countdown === COUNTDOWN_LENGTH
                    ? '发送验证码'
                    : `${countdown}秒后重试`}
                </Button>
              </View>
            </View>
          </View>
        </View>
        <View className='button-group'>
          <View className='privacy-group'>
            <CheckboxGroup onChange={this.onPrivacyCheckChange}>
              <Checkbox
                value='agreed'
                color='#BA2C28'
                onChange={this.onPrivacyCheckChange}
              />
            </CheckboxGroup>
            <Text className='privacy-text' onClick={this.onPrivacyTextClick}>
              阅读并同意
              <Text style='color:blue;'>《服务及隐私协议》</Text>
            </Text>
          </View>
          <Button
            className='login-button'
            hoverClass='login-button-hover'
            openType='getUserInfo'
            disabled={!phone_number || !sms_code || !privacy_checked}
            onGetUserInfo={this.onGetUserInfo}
          >
            登录
          </Button>
        </View>
      </View>
    )
  }
}
