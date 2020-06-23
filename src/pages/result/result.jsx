import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import './result.scss'

import { constructSearchQueryObject } from '../../utils/leancloud'
import ResultItem from './component/ResultItem'

export default class Result extends Component {
  config = {
    navigationBarTitleText: '查询结果',
    onReachBottomDistance: 360
  }

  state = {
    result: null,
    total: 0
  }

  componentWillMount() {}

  componentDidMount() {
    const { query_string } = this.$router.params
    this.queryObject = constructSearchQueryObject(query_string)
    this.queryReport()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    this.queryMore()
  }

  queryReport = async () => {
    try {
      Taro.showLoading({ title: '查询中...' })
      const reports = await this.queryObject.find()
      this.setState({
        result: reports.map(i => i.toJSON()),
        total: this.queryObject.hits()
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  queryMore = async () => {
    const { total, result } = this.state
    if (total === result.length) return
    try {
      Taro.showLoading({ title: '加载更多...' })
      const reports = await this.queryObject.find()
      this.setState(({ result: prevResult }) => {
        return {
          result: [...prevResult, ...reports.map(i => i.toJSON())]
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  handleOnItemClick = item => e => {
    e.stopPropagation()
    const { query_string } = this.$router.params
    Taro.navigateTo({
      url: `./detail?query_string=${query_string}&id=${item.objectId}`
    })
  }

  render() {
    const { query_string } = this.$router.params
    const { result, total } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <View className='header'>
          <Text className='query-title'>
            <Text style={'font-weight: bold;'}>"{query_string}"</Text> 共找到{' '}
            <Text style={'font-weight: bold;text-decoration: underline;'}>
              {total}
            </Text>{' '}
            条记录
          </Text>
        </View>
        {result.length > 0 ? (
          <View>
            {result.map(item => (
              <ResultItem
                key={item.objectId}
                query={query_string}
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
          <View>
            <View className='empty'>
              <Image
                className='empty-image'
                src={require('../../assets/empty.png')}
              />
              <Text className='empty-text'>暂无记录</Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}
