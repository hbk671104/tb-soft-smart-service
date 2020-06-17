import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './result.scss'

import ResultDetail from './component/ResultDetail'

export default class Detail extends Component {

  config = {
    navigationBarTitleText: '查询详情'
  }

  state = {
    query: null,
    result: null
  }

  componentWillMount() { }

  componentDidMount() {
    const { query_string, data } = this.$router.params
    this.setState({
      query: query_string,
      result: JSON.parse(data)
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { query, result } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <ResultDetail
          query={query}
          data={result}
        />
      </View>
    )
  }
}
