import React from "react";
import { Input } from "native-base";

const InputText = ({ h, w, placeholder, value, onChangeText }) => {
  return (
    <Input
      rounded="xl"
      bg="dark"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      borderWidth="0"
      color="#f5f4ff"
      fontWeight={"800"}
      fontSize="xs"
      _focus={{
        bg: "dark",
        fontFamily: "bold",
      }}
      paddingX="5"
      h={h ? h : 12}
      w={w ? w : "full"}
    />
  );
};

export default InputText;
