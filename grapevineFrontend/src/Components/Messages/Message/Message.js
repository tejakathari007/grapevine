import React from "react";
import { View, Box, Flex, Text, Image } from "native-base";

import { TouchableHighlight } from "react-native";
const Message = ({ onPress, username }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="rgba(61,54,130,0.050980392156862744)"
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p="2%"
      >
        <Flex direction="row" alignItems="center">
          <Image
            alt="image"
            source={require("../../../../assets/Images/1.png")}
            borderRadius="full"
            h={60}
            w={60}
          />
          <View ml="2">
            <Text fontSize={"12"} fontWeight="800">
              {username}
            </Text>
            <Text ml="3" fontSize={"12"} fontWeight="300" color="#8f8f8f">
              Liked Your Message
            </Text>
          </View>
        </Flex>
        <View ml="2">
          <Text fontSize={"12"} fontWeight="800"></Text>
          <Text fontSize={"12"} fontWeight="300" color="#8f8f8f">
            5 min
          </Text>
        </View>
      </Flex>
    </TouchableHighlight>
  );
};

export default Message;
