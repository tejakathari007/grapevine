import React from "react";
import { Box } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const BackLayout = (props) => {
  const {
    navigate,
    navigation,
    children,
    color,
    safeArea,
    showBackIcon = true,
  } = props;
  const onPress = () => {
    switch (navigate) {
      case undefined: {
        navigation.pop();
        break;
      }
      default: {
        navigation.pop();
        break;
      }
    }
  };

  return (
    <>
      {showBackIcon && (
        <Box
          position="absolute"
          left="5%"
          top={!safeArea ? "7%" : "0"}
          zIndex={11000}
        >
          <TouchableOpacity onPress={onPress}>
            <AntDesign
              name="arrowleft"
              size={28}
              color={color ? color : "#fff"}
              p="2"
            />
          </TouchableOpacity>
        </Box>
      )}
      {children}
    </>
  );
};

export default BackLayout;
