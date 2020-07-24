import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './result.scss'

import {
  constructReportObjectToWrite
} from '../../../utils/leancloud'
import ResultDetail from '../../../components/ResultItem/detail'
import Floater from '../../../components/Floater'

@connect(({ user, report }) => ({
  currentUser: user.current,
  fromSearch: !!report.search
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '报告详情'
  }

  state = {
    data: null
  }

  componentWillMount() { }

  componentDidMount() {
    this.queryItem()
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
        this.deleteItem()
      }
    } catch (error) {
      console.error(error)
    }
  }

  onEditPress = e => {
    e.stopPropagation()
    const { data } = this.state
    Taro.navigateTo({
      url: `../../dataform/dataform?id=${data.objectId}`
    })
  }

  queryItem = () => {
    const { id } = this.$router.params
    Taro.showNavigationBarLoading()
    this.props.dispatch({
      type: 'report/get',
      id,
      callback: data => {
        this.setState({
          data
        })
      },
      complete: () => {
        Taro.hideNavigationBarLoading()
      }
    })
  }

  deleteItem = async () => {
    const { data: { objectId } } = this.state
    this.props.dispatch({
      type: 'report/delete',
      id: objectId,
      callback: () => {
        Taro.navigateBack()
        Taro.showToast({
          title: '已删除',
          icon: 'success'
        })
      }
    })
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
    const { data, fromSearch } = this.state
    if (!data) {
      return null
    }
    const { technican } = data
    const { username } = this.props.currentUser
    return (
      <View className='page result'>
        <ResultDetail
          data={data}
        // onDocClick={this.onDocClick}
        />
        {
          technican === username && !fromSearch &&
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
