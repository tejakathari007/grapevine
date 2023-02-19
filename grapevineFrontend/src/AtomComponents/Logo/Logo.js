import { Image } from 'react-native';
import React, { memo } from 'react';

const Logo = ({ h, w }) => {
  return (
    <Image
      alt='image'
      style={{ width: w ? w : 150, height: h ? h : 100 }}
      source={require('../../../assets/Logo/Logo.png')}
      resizeMethod='resize'
      resizeMode='contain'
    />
  );
};

export default memo(Logo);
