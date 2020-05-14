import { View, Text } from "@tarojs/components"
import "./ResultItem.scss"

const ResultItem = ({ data }) => {
  const { 
    client_name,
    serviced_at,
    technican,
    error_detail,
    ora_error_detail, 
    software_version, 
    error_cause_detail, 
    software_type,
    solution_detail,
    software_state
  } = data
  return (
    <View className="container">
      {
        !!client_name && 
        <View className="item-container">
          <Text className="title">
            客户名称：
            <Text className="content">
              {client_name}
            </Text>
          </Text>
        </View>
      }
      {
        !!serviced_at && 
        <View className="item-container">
          <Text className="title">
            服务时间：
            <Text className="content">
              {serviced_at}
            </Text>
          </Text>
        </View>
      }
      {
        !!technican && 
        <View className="item-container">
          <Text className="title">
            服务人员：
            <Text className="content">
              {technican}
            </Text>
          </Text>
        </View>
      }
      <View className="item-container">
        <Text className="title">
          软件版本：
          <Text className="content">
            {software_version}
          </Text>
        </Text>
      </View>
      {
        !!software_state && 
        <View className="item-container">
          <Text className="title">
            运行状态：
            <Text className="content">
              {software_state}
            </Text>
          </Text>
        </View>
      }
      {
        !!software_type && 
        <View className="item-container">
          <Text className="title">
            运行类型：
            <Text className="content">
              {software_type}
            </Text>
          </Text>
        </View>
      }
      {
        !!error_detail &&
        <View className="item-container">
          <Text className="title">
            报错代码信息（详细）：
          </Text>
          <View className="content-container">
            <Text className="content">{error_detail}</Text>
          </View>
        </View>
      }
      {
        !!ora_error_detail &&
        <View className="item-container">
          <Text className="title">
            ORA 报错信息（详细）：
          </Text>
          <View className="content-container">
            <Text className="content">{ora_error_detail}</Text>
          </View>
        </View>
      }
      {
        !!error_cause_detail &&
        <View className="item-container">
          <Text className="title">
            故障原因（详细）：
          </Text>
          <View className="content-container">
            <Text className="content">{error_cause_detail}</Text>
          </View>
        </View>
      }
      {
        !!solution_detail &&
        <View className="item-container">
          <Text className="title">
            处理方案（详细）：
          </Text>
          <View className="content-container">
            <Text className="content">{solution_detail}</Text>
          </View>
        </View>
      }
    </View>
  )
}

ResultItem.defaultProps = {
  query: null,
  data: {
    client_name: null
  }
}

export default ResultItem