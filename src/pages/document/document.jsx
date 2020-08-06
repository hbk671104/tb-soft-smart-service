import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './document.scss'

import Floater from '../../components/Floater'

@connect(({ user, document }) => ({
  currentUser: user.current,
  data: document.data
}))
export default class Document extends Component {

  state = {
    path: '/'
  }

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
    const { path } = this.state
    this.props.dispatch({
      type: 'document/fetch',
      path
    })
  }

  saveDoc = files => {
    const { path } = this.state
    Taro.showLoading({ title: '上传中...' })
    this.props.dispatch({
      type: 'document/upload',
      payload: files,
      path,
      callback: () => {
        Taro.hideLoading()
      }
    })
  }

  config = {
    navigationBarTitleText: '文档'
  }

  render() {
    if (!this.props.currentUser) return null
    const { roles } = this.props.currentUser
    return (
      <View className='page'>
        <Text>Hello world!</Text>
        {roles.includes('technician') && (
          <Floater
            image={require('../../assets/create_doc.png')}
            onClick={this.onUploadDocPress}
          />
        )}
      </View>
    )
  }
}
