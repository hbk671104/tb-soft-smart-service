import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Icon, Input } from "@tarojs/components";
import "./index.scss";

import query from '../../utils/query'

export default class Index extends Component {
  config = {};

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onConfirm = ({ detail : { value } }) => {
    if (!value.trim()) return
    this.queryReport(value)
  }

  queryReport = async (value) => {
    const reports = await query(value)
    console.log(reports)
  }

  render() {
    return (
      <View className='index'>
        <View className='group'>
          <Image className='logo' src='../../assets/logo.png'/>
          <View className='input-container'>
            <Icon className='search_icon' size='16' type='search' color='#9AA0A6' />
            <Input 
              adjustPosition
              className='input' 
              placeholder='请输入故障原因 / 处理方案'
              confirmType='search'
              onConfirm={this.onConfirm}
            />
          </View>
        </View>
      </View>
    );
  }
}
