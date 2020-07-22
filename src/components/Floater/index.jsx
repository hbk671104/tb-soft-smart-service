import { View, Button, Image } from '@tarojs/components'
import './style.scss'

const Floater = ({ image, openType, relative, onClick }) => {
  return (
    <View className={`${relative ? 'relative-container' : 'container'} size custom-container`}>
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
  relative: false,
  onClick: () => null
}

export default Floater
