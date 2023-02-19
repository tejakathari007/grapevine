import { Text } from 'native-base';

const TextLight = ({ props, children }) => (
  <Text
    props={props}
    // {...style}
    // fontFamily='bold'
    // fontWeight={fontWeight || '400'}
    // fontSize={fontSize || 'sm'}
    // color={color || 'black'}
    // textAlign={textAlign || 'left'}
  >
    {children}
  </Text>
);

export default TextLight;
