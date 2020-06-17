import Taro, { Component } from "@tarojs/taro"
import { View, Image, Text, Icon, Input } from "@tarojs/components"
import "./index.scss"

export default class Index extends Component {

  config = {
    navigationBarTitleText: "自助查询"
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onConfirm = ({ detail: { value } }) => {
    if (!value.trim()) return
    Taro.navigateTo({
      url: `../result/result?query_string=${value}`
    })
  }

  render() {
    return (
      <View className="page index">
        <View className="group">
          <Image className="logo" src="../../assets/logo.png" />
          <View className="input-container">
            <Icon
              className="search_icon"
              size="16"
              type="search"
              color="#9AA0A6"
            />
            <Input
              adjustPosition
              className="input"
              placeholder="请输入故障原因 / 处理方案"
              confirmType="search"
              onConfirm={this.onConfirm}
            />
          </View>
          <View className='copyright-container'>
            <Text className='copyright-text'>© 2020 九桥同步</Text>
          </View>
        </View>
      </View>
    )
  }
}
