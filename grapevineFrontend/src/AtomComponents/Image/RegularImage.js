import React, { memo } from 'react';
import { Image } from 'react-native';

const RegularImage = ({ h, w, image }) => {
  return (
    <Image
      alt='image'
      style={{ width: w ? w : 150, height: h ? h : 150, margin: 5 }}
      source={image}
      resizeMethod='resize'
      resizeMode='contain'
    />
  );
};

export default memo(RegularImage);
