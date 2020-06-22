import { Text } from '@tarojs/components'

const Highlighter = ({ text, query }) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <Text className='custom-class'>
      {parts.map((part, i) => (
        <Text
          key={`${i}`}
          style={
            part.toLowerCase() === query.toLowerCase()
              ? {
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }
              : {}
          }
        >
          {part}
        </Text>
      ))}
    </Text>
  )
}

Highlighter.externalClasses = ['custom-class']

Highlighter.defaultProps = {
  text: 'text',
  query: 'text'
}

export default Highlighter
