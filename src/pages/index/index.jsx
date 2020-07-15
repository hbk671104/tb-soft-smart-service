import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Icon, Input, Button } from '@tarojs/components'
import './index.scss'

import Floater from '../../components/Floater'
import { getCurrentUser } from '../../utils/login'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '自助查询'
  }

  componentWillMount() {
    this.currentUser = getCurrentUser()
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    Taro.hideHomeButton()
  }

  componentDidHide() {}

  onConfirm = ({ detail: { value } }) => {
    if (!value.trim()) return
    Taro.navigateTo({
      url: `../result/result?query_string=${value}`
    })
  }

  onAddPress = e => {
    e.stopPropagation()
    Taro.navigateTo({
      url: '../dataform/dataform'
    })
  }

  render() {
    if (!this.currentUser) return null
    const { roles } = this.currentUser
    return (
      <View className='page index'>
        <View className='group'>
          <Image className='logo' src={require('../../assets/logo.png')} />
          <View className='input-container'>
            <Icon
              className='search_icon'
              size='16'
              type='search'
              color='#9AA0A6'
            />
            <Input
              adjustPosition
              className='input'
              placeholderClass='input-placeholder'
              placeholder='请输入故障原因 / 处理方案'
              confirmType='search'
              onConfirm={this.onConfirm}
            />
          </View>
          {roles.includes('technician') && (
            <Floater
              image={require('../../assets/add.png')}
              onClick={this.onAddPress}
            />
          )}
        </View>
      </View>
    )
  }
}
