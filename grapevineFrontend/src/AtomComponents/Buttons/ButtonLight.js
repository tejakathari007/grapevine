import React from 'react';
import { Box, Button, Text } from 'native-base';

const ButtonLight = ({ children, ...props }) => {
  return (
    <Button
      h={props.h ? props.h : '12'}
      w={props.w ? props.w : '100%'}
      justifyContent='center'
      alignItems={'center'}
      mt='1'
      mb='1'
      borderRadius={'full'}
      bg='light'
      onPress={props.onPress}
      _pressed={{
        bg: 'dark',
      }}
      _text={{
        fontWeight: '800',
        fontSize: 'md',
        fontFamily: 'bold',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonLight;
