import { View, Button, Image } from '@tarojs/components'
import './style.scss'

const Floater = ({ image, openType, onClick }) => {
  return (
    <View className='container custom-container'>
      <Button className='button' openType={openType} onClick={onClick}>
        <Image className='image' src={image} />
      </Button>
    </View>
  )
}

Floater.externalClasses = ['custom-container']

Floater.defaultProps = {
  image: null,
  openType: null,
  onClick: () => null
}

export default Floater
