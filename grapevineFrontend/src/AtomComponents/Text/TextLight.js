import { Text } from 'native-base';

const TextBold = ({
  style,
  fontSize,
  color,
  textAlign,
  fontWeight,
  children,
}) => (
  <Text
    {...style}
    fontFamily='bold'
    fontWeight={fontWeight || '400'}
    fontSize={fontSize || 'sm'}
    color={color || 'black'}
    textAlign={textAlign || 'left'}
  >
    {children}
  </Text>
);

export default TextBold;
