import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './entry.scss'

import ResultDetail from '../../../components/ResultItem/detail'
import Empty from '../../../components/Empty'

@connect(({ user }) => ({
  data: user.report.upload || []
}))
export default class Entry extends Component {
  config = {
    navigationBarTitleText: '我的录入'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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
              <ResultDetail
                key={item.objectId}
                data={item}
                onClick={this.handleOnItemClick(item)}
              />
            ))}
            <View className='footer'>
              <Text className='footer-text'>
                {'--------- 我是有底线的 ---------'}
              </Text>
            </View>
          </View>
        ) : (
          <Empty />
        )}
      </View>
    )
  }
}
