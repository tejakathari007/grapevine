import { ActivityIndicator } from 'react-native';
import React from 'react';
import { Box, Text, View, Input } from 'native-base';
import RegularImage from '../Image/RegularImage';

const InputUsername = ({ h, w, placeholder, value, onChangeText, state }) => {
  return (
    <Box
      bg='dark'
      h={h ? h : '16'}
      w={w ? w : 'full'}
      borderRadius='md'
      flexDirection={'row'}
      justifyContent='center'
      alignItems={'center'}
      m='2'
    >
      <View
        flex={8}
        h='100%'
        borderRadius={'md'}
        justifyContent='center'
        alignItems={'center'}
      >
        <Input
          w='90%'
          h='60%'
          fontSize={12}
          color={'#f5f4ff'}
          fontWeight={'800'}
          borderWidth={0}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          fontFamily='bold'
        />
      </View>

      <View
        flex={2}
        h='60%'
        justifyContent={'center'}
        alignItems='center'
        flexDirection={'row'}
        borderLeftWidth={1}
        borderLeftColor='#fff'
      >
        {state == 'valid' ? (
          <RegularImage
            h={15}
            w={15}
            image={require('../../../assets/Icons/Tick_green.png')}
          />
        ) : state == 'loading' ? (
          <ActivityIndicator size='small' color='#0000ff' />
        ) : (
          <RegularImage
            h={15}
            w={15}
            image={{
              uri: 'https://img.icons8.com/fluency/48/000000/delete-sign.png',
            }}
          />
        )}
      </View>
    </Box>
  );
};

export default InputUsername;
