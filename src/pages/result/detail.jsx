import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './result.scss'

import ResultDetail from './component/ResultDetail'

export default class Detail extends Component {
  config = {
    navigationBarTitleText: '查询详情'
  }

  state = {
    result: null
  }

  componentWillMount() { }

  componentDidMount() {
    const { data } = this.$router.params
    this.setState({
      result: JSON.parse(data)
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { query_string } = this.$router.params
    const { result } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <ResultDetail query={query_string} data={result} />
      </View>
    )
  }
}
