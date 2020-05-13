import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './result.scss'

import ResultItem from './component/result_item'

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
        {result.map((i, index) => <ResultItem key={`${index}`} data={i} />)}
      </View>
    )
  }
}
