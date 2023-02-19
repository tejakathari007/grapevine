import React from 'react';
import { Center, Image, View } from 'native-base';
const ColorWrapper = ({ children }) => {
  return (
    <Center rounded='xl' p='1' bg='dark:alpha.50' w='full'>
      {children}
    </Center>
  );
};

export default ColorWrapper;
