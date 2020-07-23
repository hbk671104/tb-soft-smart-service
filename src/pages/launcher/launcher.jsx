import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtActivityIndicator } from 'taro-ui'
import './launcher.scss'

@connect(() => ({}))
export default class Launcher extends Component {
  componentWillMount() { }

  componentDidMount() {
    this.props.dispatch({
      type: 'user/checkLoginStatus',
      callback: isLoggedIn => {
        Taro.reLaunch({
          url: isLoggedIn ? '../index/index' : '../login/login'
        })
      }
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='page launcher'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
        </View>
        <View className='content'>
          <AtActivityIndicator size={48} />
        </View>
      </View>
    )
  }
}
