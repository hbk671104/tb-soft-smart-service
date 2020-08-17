import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtSwipeAction, AtSearchBar } from 'taro-ui'
import './document.scss'

import Floater from '../../components/Floater'
import Empty from '../../components/Empty'

@connect(({ user, document }) => {
  const { category } = document.current
  let data = document.data
  if (category) {
    data = document[category].data
  }
  return {
    currentCategory: category,
    currentUser: user.current,
    data
  }
})
export default class Document extends Component {

  componentWillMount() { }

  componentDidMount() {
    this.fetchDocs()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onUploadDocPress = async e => {
    e.stopPropagation()
    try {
      const { tempFiles } = await Taro.chooseMessageFile({
        count: 5,
        type: 'file'
      })
      this.saveDoc(tempFiles)
    } catch (error) {
      console.error(error)
    }
  }

  fetchDocs = () => {
    const { currentCategory } = this.props
    Taro.showNavigationBarLoading()
    this.props.dispatch({
      type: 'document/fetch',
      category: currentCategory,
      callback: () => {
        Taro.hideNavigationBarLoading()
      }
    })
  }

  saveDoc = files => {
    const { currentCategory } = this.props
    Taro.showLoading({ title: '上传中...' })
    this.props.dispatch({
      type: 'document/upload',
      payload: files,
      category: currentCategory,
      callback: () => {
        Taro.hideLoading()
      }
    })
  }

  onFolderClick = payload => e => {
    e.stopPropagation()
    this.props.dispatch({
      type: 'document/saveCategory',
      payload
    })
    Taro.setNavigationBarTitle({ title: payload.name })
  }

  onDocClick = item => e => {
    e.stopPropagation()
    Taro.showLoading({ title: '下载中...' })
    this.props.dispatch({
      type: 'document/download',
      payload: item,
      fail: msg => {
        Taro.showToast({
          title: msg,
          icon: 'none'
        })
      },
      complete: () => {
        Taro.hideLoading()
      }
    })
  }

  onDocOptionClick = item => async ({ text }) => {
    if (text === '确认') {
      const { confirm } = await Taro.showModal({
        title: '提示',
        content: `确认删除「${item.file.name}」吗？`,
        confirmText: '删除',
        confirmColor: '#BA2C28'
      })
      if (confirm) {
        const { currentCategory } = this.props
        this.props.dispatch({
          type: 'document/delete',
          payload: item,
          category: currentCategory
        })
      }
    }
  }

  onBackPress = e => {
    e.stopPropagation()
    this.props.dispatch({
      type: 'document/saveCategory',
      payload: {
        name: null,
        category: null
      }
    })
    Taro.setNavigationBarTitle({ title: '文档' })
  }

  config = {
    navigationBarTitleText: '文档'
  }

  render() {
    if (!this.props.currentUser) return null
    const { roles } = this.props.currentUser
    const { currentCategory, data } = this.props
    return (
      <View className='page'>
        {/* <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        /> */}
        {
          !currentCategory &&
          <AtList hasBorder={false}>
            <AtListItem
              title='产品介绍'
              onClick={this.onFolderClick({ name: '产品介绍', category: 'product_intro' })}
              arrow='right'
              thumb={require('../../assets/folder.png')}
            />
            <AtListItem
              title='安装测试巡检文档'
              onClick={this.onFolderClick({ name: '安装测试巡检文档', category: 'installation_and_test' })}
              arrow='right'
              thumb={require('../../assets/folder.png')}
            />
            <AtListItem
              title='软件技术类文档'
              onClick={this.onFolderClick({ name: '软件技术类文档', category: 'software_technology' })}
              arrow='right'
              thumb={require('../../assets/folder.png')}
            />
            <AtListItem
              title='其它'
              onClick={this.onFolderClick({ name: '其它', category: 'miscellaneous' })}
              arrow='right'
              thumb={require('../../assets/folder.png')}
            />
          </AtList>
        }
        {
          !!data && <AtList hasBorder={false}>
            {
              data.map(d => (
                <AtSwipeAction
                  key={d.objectId}
                  autoClose
                  onClick={this.onDocOptionClick(d)}
                  options={[
                    {
                      text: '取消',
                      style: {
                        backgroundColor: '#6190E8'
                      }
                    },
                    {
                      text: '确认',
                      style: {
                        backgroundColor: '#ba2c28'
                      }
                    }
                  ]}>
                  <AtListItem
                    title={d.file.name}
                    onClick={this.onDocClick(d.file)}
                    thumb={require('../../assets/document.png')}
                  />
                </AtSwipeAction>
              ))
            }
          </AtList>
        }
        {
          !data && !!currentCategory && <Empty text='暂无文档' />
        }
        {roles.includes('technician') && (
          <Floater
            image={require('../../assets/create_doc.png')}
            onClick={this.onUploadDocPress}
          />
        )}
        {!!currentCategory && (
          <Floater
            style='bottom:36px;'
            image={require('../../assets/back.png')}
            onClick={this.onBackPress}
          />
        )}
      </View>
    )
  }
}
