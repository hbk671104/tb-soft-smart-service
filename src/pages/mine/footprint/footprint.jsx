import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './footprint.scss'

import ResultDetail from '../../../components/ResultItem/detail'

@connect(({ user }) => ({
  data: user.report.footprint || []
}))
export default class Footprint extends Component {
  config = {
    navigationBarTitleText: '我的足迹'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleOnItemClick = item => e => {
    e.stopPropagation()
    Taro.navigateTo({
      url: `../../index/result/detail?id=${item.objectId}`
    })
  }

  render() {
    const { data } = this.props
    return (
      <View className='page result'>
        <View className='header'>
          <Text className='query-title'>
            <Text style={'font-weight: bold;text-decoration: underline;'}>
              {data.length}
            </Text>{' '}
            条记录
          </Text>
        </View>
        {data.length > 0 ? (
          <View>
            {data.map(item => (
              <View key={item.objectId}>
                <View className='item-header'>
                  <Text className='viewed-at'>
                    浏览于{' '}
                    <Text style='text-decoration:underline;'>
                      {item.last_viewed_at}
                    </Text>
                  </Text>
                </View>
                <ResultDetail
                  data={item}
                  onClick={this.handleOnItemClick(item)}
                />
              </View>
            ))}
            <View className='footer'>
              <Text className='footer-text'>
                {'--------- 我是有底线的 ---------'}
              </Text>
            </View>
          </View>
        ) : (
            <View>
              <View className='empty'>
                <Image
                  className='empty-image'
                  src={require('../../../assets/empty.png')}
                />
                <Text className='empty-text'>暂无记录</Text>
              </View>
            </View>
          )}
      </View>
    )
  }
}
