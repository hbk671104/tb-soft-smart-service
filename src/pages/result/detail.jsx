import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './result.scss'

import { constructObjectToDelete } from '../../utils/leancloud'
import ResultDetail from './component/ResultDetail'
import Floater from '../../components/Floater'

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

  onDeletePress = e => {
    e.stopPropagation()
    Taro.showModal({
      title: '提示',
      content: '确认删除？',
      confirmText: '删除',
      confirmColor: 'rgb(186, 44, 40)',
      success: ({ confirm }) => {
        if (confirm) {
          const { result } = this.state
          this.deleteObject = constructObjectToDelete(result.objectId)
          this.deleteItem()
        }
      }
    })
  }

  deleteItem = async () => {
    try {
      const result = await this.deleteObject.destroy()
      Taro.reLaunch({
        url: '../index/index'
      })
      Taro.showToast({
        title: '删除成功！',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { query_string } = this.$router.params
    const { result } = this.state
    if (!result) {
      return null
    }

    return (
      <View className='page result'>
        <ResultDetail query={query_string} data={result} />
        <Floater
          image={require('../../assets/delete.png')}
          onClick={this.onDeletePress}
        />
      </View>
    )
  }
}
