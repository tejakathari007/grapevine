import React from 'react';
import { View, Text, Input } from 'native-base';
import { TextInput } from 'react-native';
const InputIntrests = ({ value, onChangeText, placeholder, w, h }) => {
  return (
    <Input
      w='60%'
      bg='white'
      borderRadius='10'
      style={{ width: w ? w : '100%', height: h ? h : 30 }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      color='black'
      _focus={{
        bg: 'white',
        fontFamily: 'bold',
      }}
    />
  );
};

export default InputIntrests;
