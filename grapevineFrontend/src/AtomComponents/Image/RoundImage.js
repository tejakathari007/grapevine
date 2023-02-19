import React, { memo } from 'react';
import { Image, Box, Avatar } from 'native-base';
const RoundImage = ({ size, image, boxClass, ...props }) => {
  return (
    <Box borderWidth='2' borderColor='primary' p='0.5' borderRadius='full'>
      <Image
        alt='image'
        // style={{
        //   width: size ? size : 150,
        //   height: size ? size : 100,
        //   borderRadius: size / 2,
        // }}
        // source={image}
        // resizeMethod='resize'
        // resizeMode='contain'
        // {...props}
        borderRadius='full'
        width={size ? size : 150}
        height={size ? size : 150}
        source={image}
        resizeMethod='resize'
        resizeMode='contain'
        {...props}
      />
    </Box>
  );
};

export default memo(RoundImage);
