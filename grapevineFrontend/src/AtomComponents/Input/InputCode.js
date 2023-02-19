import React from 'react';
import { Box, View, Input } from 'native-base';
import CodeInput from 'react-native-code-input';

const InputCode = ({ h, w, onChangeText }) => {
  return (
    <Box
      bg='dark'
      borderRadius={'md'}
      flexDirection='row'
      justifyContent={'center'}
      alignItems='center'
      m='5'
      h={h ? h : 53}
      w={w ? w : '100%'}
    >
      <CodeInput
        borderType={'underline'}
        space={20}
        size={20}
        inputPosition='center'
        onFulfill={onChangeText}
      />
    </Box>
  );
};

export default InputCode;
