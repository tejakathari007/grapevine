import React from "react";
import { Box } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const BackIcon = ({ onPress }) => {
  return (
    <Box position="absolute" top="7%" left="5%">
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="arrowleft" size={28} color="#fff" p="2" />
      </TouchableOpacity>
    </Box>
  );
};

export default BackIcon;
