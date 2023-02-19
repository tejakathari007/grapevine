import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, View, Image } from 'native-base';
const CollectionBox = ({ data }) => {
  return (
    <View h='100' w='160' ml='2' borderRadius={'md'}>
      <Image
        alt='image'
        source={require('../../../assets/Images/4.png')}
        h='100%'
        w='100%'
        position={'absolute'}
        borderRadius='md'
      />
      <Box
        w='100%'
        h='100%'
        borderRadius={'md'}
        bg='rgba(81,98,241,0.5)'
        justifyContent={'center'}
      >
        <Text
          fontSize={12}
          color='#181351'
          fontWeight={'800'}
          textAlign='center'
        >
          {data.title}
        </Text>
        <Text fontSize={10} color='#000' fontWeight={'300'} textAlign='center'>
          {data.des}
        </Text>
      </Box>
    </View>
  );
};

export default CollectionBox;
