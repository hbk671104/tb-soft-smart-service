import { View, Text } from '@tarojs/components'

const item = ({ data }) => {
  return (
    <View>
      <Text>{data.software_type}</Text>
    </View>
  )
}

export default item