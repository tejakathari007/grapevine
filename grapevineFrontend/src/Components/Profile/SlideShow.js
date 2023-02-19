import { View, Text, Slide, Box, Button, Flex, Pressable } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const SlideShow = ({ show, close, component }) => {
  return (
    <View>
      <Slide in={show} height="100%">
        <Flex
          direction="column"
          justifyContent={"flex-end"}
          h="100%"
          alignItems={"center"}
        >
          <Box
            p={10}
            _text={{
              color: "white",
            }}
            rounded="md"
            h="50%"
            w="80%"
            bg="#fff"
            borderTopRadius={100}
            borderWidth={1}
            borderColor="#d3d3d3"
          >
            <Flex direction="column" h="100%" justifyContent={"space-between"}>
              <View w="100%">
                <View alignItems={"center"}>
                  <AntDesign name="plus" size={18} color="blue" p="2" />
                  <Text fontWeight={"800"} fontSize={18}>
                    Add a Network
                  </Text>
                </View>
              </View>
              <Pressable onPress={close}>
                <Box
                  bg="buttonPrimaryColor"
                  justifyContent={"center"}
                  alignItems="center"
                  p={1}
                  borderRadius="md"
                >
                  Finish
                </Box>
              </Pressable>
            </Flex>
          </Box>
        </Flex>
      </Slide>
    </View>
  );
};

export default SlideShow;
