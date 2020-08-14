import { View, Button, Image } from '@tarojs/components'
import './style.scss'

const Floater = ({ style, image, openType, relative, onClick }) => {
  return (
    <View
      className={`${relative ? 'relative-container' : 'container'} size`}
      style={style}
    >
      <Button className='button' openType={openType} onClick={onClick}>
        <Image className='image' src={image} />
      </Button>
    </View>
  )
}

Floater.defaultProps = {
  image: null,
  openType: null,
  relative: false,
  onClick: () => null
}

export default Floater
