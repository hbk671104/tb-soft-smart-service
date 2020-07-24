import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './result.scss'

import {
  constructReportObjectToWrite,
  constructSearchQuery
} from '../../../utils/leancloud'
import ResultDetail from '../../../components/ResultItem/detail'
import Floater from '../../../components/Floater'

@connect(({ user }) => ({
  currentUser: user.current
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '报告详情'
  }

  state = {
    result: null
  }

  componentWillMount() { }

  componentDidMount() {
    const { id } = this.$router.params
    this.queryObject = constructSearchQuery()
    this.queryItem(id)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onShareAppMessage(info) {
    const { id } = this.$router.params
    return {
      title: '分享「错误报告」',
      path: `/pages/index/result/detail?id=${id}`
    }
  }

  onDeletePress = async e => {
    e.stopPropagation()
    try {
      const { confirm } = await Taro.showModal({
        title: '提示',
        content: '确认删除？',
        confirmText: '删除',
        confirmColor: '#BA2C28'
      })
      if (confirm) {
        const { result } = this.state
        this.deleteObject = constructReportObjectToWrite(result.objectId)
        this.deleteItem()
      }
    } catch (error) {
      console.error(error)
    }
  }

  onEditPress = e => {
    e.stopPropagation()
    const { result } = this.state
    Taro.navigateTo({
      url: `../../dataform/dataform?id=${result.objectId}`
    })
  }

  queryItem = async id => {
    try {
      Taro.showNavigationBarLoading()
      const report = await this.queryObject.get(id)
      this.setState({
        result: report.toJSON()
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideNavigationBarLoading()
    }
  }

  deleteItem = async () => {
    try {
      const result = await this.deleteObject.destroy()
      Taro.reLaunch({
        url: '../index'
      })
      Taro.showToast({
        title: '删除成功！',
        icon: 'success'
      })
    } catch (error) {
      console.error(error)
    }
  }


  // onDocClick = ({ name, url }) => e => {
  //   e.stopPropagation()
  //   Taro.showLoading({ title: '正在下载...' })
  //   Taro.downloadFile({
  //     url: url.replace(/^http/, 'https'),
  //     filePath: `${Taro.env.USER_DATA_PATH}/${name}`,
  //     success: async ({ filePath }) => {
  //       try {
  //         await Taro.openDocument({
  //           filePath
  //         })
  //       } catch (error) {
  //         console.error(error)
  //       }
  //     },
  //     complete: () => {
  //       Taro.hideLoading()
  //     }
  //   })
  // }

  render() {
    const { result } = this.state
    if (!result) {
      return null
    }
    const { technican } = result
    const { username } = this.props.currentUser
    return (
      <View className='page result'>
        <ResultDetail
          data={result}
        // onDocClick={this.onDocClick}
        />
        {
          technican === username &&
          <View className='at-row at-row__justify--center operation-group'>
            <View className='at-col at-col-4 floater-group'>
              <Floater
                relative
                image={require('../../../assets/edit.png')}
                onClick={this.onEditPress}
              />
            </View>
            <View className='at-col at-col-4 floater-group'>
              <Floater
                relative
                image={require('../../../assets/delete.png')}
                onClick={this.onDeletePress}
              />
            </View>
          </View>
        }
        <Floater
          image={require('../../../assets/share.png')}
          openType='share'
        />
      </View>
    )
  }
}
