import React from 'react';
import { Box, Text, View, Image } from 'native-base';
const AllCreators = ({ w }) => {
  return (
    <Box borderRadius='md' h='100%'>
      <Image
        alt='image'
        height='100%'
        width={'100%'}
        position='absolute'
        borderRadius={'md'}
        source={require('../../../assets/Images/4.png')}
      />

      <Box
        w='100%'
        h='100%'
        borderRadius={'md'}
        bg='rgba(81,98,241,0.5)'
        justifyContent={'center'}
      >
        <Text
          fontSize={26}
          color='#0c0655'
          fontWeight={'800'}
          textAlign='center'
        >
          All Creators
        </Text>
      </Box>
    </Box>
  );
};

export default AllCreators;
