import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './result.scss'

import { constructSearchQueryObject } from '../../../utils/leancloud'
import ResultItem from '../../../components/ResultItem'
import Empty from '../../../components/Empty'

@connect(({ report }) => ({
  hits: report.search.hits,
  data: report.search.data
}))
export default class Result extends Component {
  config = {
    navigationBarTitleText: '查询结果',
    onReachBottomDistance: 360
  }

  componentWillMount() {}

  componentDidMount() {
    const { query_string } = this.$router.params
    this.queryObject = constructSearchQueryObject(query_string)
    this.queryReport()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'report/removeSearch'
    })
  }

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    this.queryMore()
  }

  queryReport = () => {
    Taro.showLoading({ title: '查询中...' })
    this.props.dispatch({
      type: 'report/search',
      object: this.queryObject,
      complete: () => {
        Taro.hideLoading()
      }
    })
  }

  queryMore = () => {
    const { hits, data } = this.props
    if (hits === data.length) return
    this.queryReport()
  }

  handleOnItemClick = item => e => {
    e.stopPropagation()
    const { query_string } = this.$router.params
    Taro.navigateTo({
      url: `./detail?id=${item.objectId}`
    })
  }

  render() {
    const { query_string } = this.$router.params
    const { data, hits } = this.props

    return (
      <View className='page result'>
        <View className='header'>
          <Text className='query-title'>
            <Text style={'font-weight: bold;'}>"{query_string}"</Text> 共找到{' '}
            <Text style={'font-weight: bold;text-decoration: underline;'}>
              {hits}
            </Text>{' '}
            条记录
          </Text>
        </View>
        {!!data && data.length > 0 ? (
          <View>
            {data.map(item => (
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
          <Empty />
        )}
      </View>
    )
  }
}
