// import { Text, TextInput } from 'react-native';
import { Input } from "native-base";
import React from "react";

const InputBase = ({
  value,
  onChangeText,
  placeholder,
  w,
  h,
  editable = true,
  status = "normal",
  bold = true,
  color = "#fff",
}) => {
  return (
    <Input
      borderWidth={0}
      width={w ? w : "full"}
      height={h ? h : "8"}
      color={color}
      borderBottomWidth="2"
      fontSize="sm"
      mb="5"
      p="0"
      borderBottomColor={status == "normal" ? "light" : "red.500"}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      _focus={{ bg: "none" }}
      fontFamily={bold ? "bold" : "light"}
    />
  );
};

export default InputBase;
