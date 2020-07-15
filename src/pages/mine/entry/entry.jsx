import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './entry.scss'

import { constructSearchQuery } from '../../../utils/leancloud'
import { getCurrentUser } from '../../../utils/login'
import ResultDetail from '../../../components/ResultItem/detail'

export default class Entry extends Component {
  config = {
    navigationBarTitleText: '我的录入'
  }

  state = {
    result: null,
    total: 0
  }

  componentWillMount() {
    this.currentUser = getCurrentUser()
  }

  componentDidMount() {
    this.queryObject = constructSearchQuery()
    this.queryMyEntry()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  queryMyEntry = async () => {
    try {
      Taro.showLoading({ title: '加载中...' })
      const { username } = this.currentUser
      this.queryObject.equalTo('technican', username);
      const reports = await this.queryObject.find()
      this.setState({
        result: reports.map(i => i.toJSON()),
        total: reports.length
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
      url: `../../index/result/detail?id=${item.objectId}`
    })
  }

  render() {
    const { result, total } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <View className='header'>
          <Text className='query-title'>
            <Text style={'font-weight: bold;text-decoration: underline;'}>
              {total}
            </Text>{' '}
            条记录
          </Text>
        </View>
        {result.length > 0 ? (
          <View>
            {result.map(item => (
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

