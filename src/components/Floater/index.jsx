import { View, Button, Image } from '@tarojs/components'
import './style.scss'

const Floater = ({ image, onClick }) => {
  return (
    <View className='container custom-container'>
      <Button className='button' onClick={onClick}>
        <Image className='image' src={image} />
      </Button>
    </View>
  )
}

Floater.externalClasses = ['custom-container']

Floater.defaultProps = {
  image: null,
  onClick: () => null
}

export default Floater
