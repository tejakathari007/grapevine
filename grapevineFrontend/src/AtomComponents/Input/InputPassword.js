import { Text, Input, Icon } from 'native-base';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
const InputPassword = ({
  value,
  onChangeText,
  placeholder,
  w,
  h,
  editable = true,
  status = 'normal',
  bold = true,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <Input
      // w={w ? w : 'full'}
      // h={h ? h : '8'}
      // color='#fff'
      // borderWidth={0}
      // borderBottomColor={status == 'normal' ? 'light' : 'red.500'}
      // borderBottomWidth={2}
      // // fontSize={12}
      type={show || 'password'}
      // mb='5'
      // p='0'
      InputRightElement={
        <Icon
          as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
          size={5}
          color='white'
          onPress={() => setShow(!show)}
        />
      }
      // placeholder={placeholder}
      // value={value}
      // onChangeText={onChangeText}
      // editable={editable}
      // _focus={{ bg: 'none' }}
      borderWidth={0}
      width={w ? w : 'full'}
      height={h ? h : '8'}
      color='#fff'
      borderBottomWidth='2'
      fontSize='sm'
      p='0'
      borderBottomColor={status == 'normal' ? 'light' : 'red.500'}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      _focus={{ bg: 'none' }}
      fontFamily={bold ? 'bold' : 'light'}
    />
  );
};

export default InputPassword;
