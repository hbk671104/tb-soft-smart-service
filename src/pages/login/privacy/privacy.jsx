import Taro, { Component } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import './privacy.scss'
import data from './data'

export default class Privacy extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '隐私协议'
  }

  render() {
    return (
      <View className='page privacy'>
        <RichText className='text' nodes={data} />
      </View>
    )
  }
}
