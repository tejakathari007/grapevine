import React from 'react';
import { Button, Text } from 'native-base';
const ButtonTransparentDarkBorder = ({ onPress, h, w, children }) => {
  return (
    <Button
      borderColor='dark'
      h={props.h ? props.h : 50}
      w={props.w ? props.w : '100%'}
      borderWidth={3}
      bg='rgba(0,0,0,0)'
      justifyContent='center'
      alignItems={'center'}
      mt='1'
      mb='1'
      onPress={onPress}
    >
      <Text fontSize={'14'} fontWeight='800' color={'#fff'} fontFamily='bold'>
        {children}
      </Text>
    </Button>
  );
};

export default ButtonTransparentDarkBorder;
