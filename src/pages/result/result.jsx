import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './result.scss'

import query from "../../utils/query"
import ResultItem from './component/ResultItem'

export default class Result extends Component {

  config = {
    navigationBarTitleText: '查询结果'
  }

  state = {
    query: null,
    result: null
  }

  componentWillMount() { }

  componentDidMount() {
    const { query_string } = this.$router.params
    this.queryReport(query_string)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  queryReport = async value => {
    try {
      Taro.showLoading({ title: '查询中...' })
      const reports = await query(value)
      this.setState({
        query: value,
        result: reports.map(i => i.toJSON())
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  handleOnItemClick = item => e => {
    e.stopPropagation()
    Taro.navigateTo({
      url: `./detail?query_string=${this.state.query}&data=${JSON.stringify(item)}`
    })
  }

  render() {
    const { query, result } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <View className='header'>
          <Text className='query_title'>"{query}"</Text>
        </View>
        {
          result.length > 0 ?
            result.map(item =>
              <ResultItem
                key={item.objectId}
                query={query}
                data={item}
                onClick={this.handleOnItemClick(item)}
              />
            )
            :
            <View>
              <Text>暂无数据</Text>
            </View>
        }
      </View>
    )
  }
}
