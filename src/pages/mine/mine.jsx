import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem } from 'taro-ui'
import './mine.scss'

import Floater from '../../components/Floater'
import { logout } from '../../utils/login'

@connect(({ user }) => ({
  currentUser: user.current
}))
export default class Mine extends Component {
  componentWillMount() { }

  componentDidMount() { }

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
      this.props.dispatch({
        type: 'user/removeCurrent'
      })
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

  onCollectionClick = e => {
    e.stopPropagation()
    Taro.showToast({
      title: '即将上线，敬请期待。',
      icon: 'none'
    })
  }

  onMyEntryClick = e => {
    e.stopPropagation()
    Taro.navigateTo({
      url: './entry/entry'
    })
  }

  onFootprintClick = e => {
    e.stopPropagation()
    Taro.navigateTo({
      url: './footprint/footprint'
    })
  }

  render() {
    if (!this.props.currentUser) return null
    const {
      nickName,
      avatarUrl,
      mobilePhoneNumber,
      username
    } = this.props.currentUser
    return (
      <View className='page mine'>
        <View className='header'>
          <View className='avatar_wrapper'>
            <Image className='avatar' src={avatarUrl} />
          </View>
          <View className='user_info'>
            <Text className='nick_name'>
              {nickName}
              {!!username && <Text className='username'>({username})</Text>}
            </Text>
            <Text className='phone_number'>{mobilePhoneNumber}</Text>
          </View>
        </View>
        <View className='content'>
          <AtList className='list' hasBorder={false}>
            <AtListItem
              className='list_item'
              title='我的收藏'
              onClick={this.onCollectionClick}
              arrow='right'
              thumb={require('../../assets/collection.png')}
            />
            <AtListItem
              className='list_item'
              title='我的录入'
              onClick={this.onMyEntryClick}
              arrow='right'
              thumb={require('../../assets/upload.png')}
            />
            <AtListItem
              className='list_item'
              title='我的足迹'
              onClick={this.onFootprintClick}
              arrow='right'
              thumb={require('../../assets/footprint.png')}
            />
          </AtList>
        </View>
        <Floater
          image={require('../../assets/logout.png')}
          onClick={this.onLogoutClick}
        />
      </View>
    )
  }
}
