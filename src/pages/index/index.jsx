import Taro, { Component } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {};

  render() {
    return (
      <View className="index">
        <View className="group">
          <Image className="logo" src="https://via.placeholder.com/240"/>
          <View className="input-container">
            <Input type='text' placeholder='请输入错误信息' />
          </View>
        </View>
      </View>
    );
  }
}
