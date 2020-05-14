import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './result.scss'

import ResultItem from './component/ResultItem'

export default class Result extends Component {

  state = {
    query: null,
    result: null
  }

  componentWillMount () { 
    const { data } = this.$router.params
    const { query, result } = JSON.parse(data)
    this.setState({
      query,
      result
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '查询结果'
  }

  render () {
    const { query, result } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <View className='header'>
          <Text className='title'>关键词: "{query}"</Text>
        </View>
        {
          result.length > 0 ? 
          result.map(item => <ResultItem key={item.objectId} query={query} data={item} />) 
          : 
          <View>
            <Text>暂无数据</Text>
          </View>
        }
      </View>
    )
  }
}
