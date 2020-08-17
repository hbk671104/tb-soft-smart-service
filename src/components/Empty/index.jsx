import { View, Image } from '@tarojs/components'
import './style.scss'

const Empty = ({ image, text }) => {
  return (
    <View className='empty'>
      <Image
        className='empty-image'
        src={image}
      />
      <Text className='empty-text'>
        {text}
      </Text>
    </View>
  )
}

Empty.defaultProps = {
  image: require('../../assets/empty.png'),
  text: '暂无记录'
}

export default Empty
