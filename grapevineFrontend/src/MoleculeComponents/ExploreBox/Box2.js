import { View, Text, Flex, Image, Box } from "native-base";
import React from "react";
const colors = [
  "#266185",
  "#c78ce5",
  "#7d2619",
  "#93c7d6",
  "#7a5110",
  "#3f5b31",
];
const Box2 = () => {
  return (
    <View h={200} w={300} m="5">
      <Box
        h="100%"
        w="100%"
        borderRadius={50}
        shadow="3"
        bg={{
          linearGradient: {
            colors: [
              // colors[Math.floor(Math.random() * (4 + 1))],
              // colors[Math.floor(Math.random() * (4 + 1))],
              colors[0],
              colors[1],
            ],
            start: [0, 1],
            end: [1, 0],
          },
        }}
        p={5}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <View
          bg="#fff"
          borderRadius={"md"}
          position="absolute"
          top={5}
          left={5}
        >
          <Text>new</Text>
        </View>
        <Text fontSize={28} textAlign="center" fontWeight={"800"} color="#fff">
          Why <Text color="#ffff00">LIGHTING</Text> matters
        </Text>
        <Text
          color="#fff"
          textAlign="center"
          fontWeight={"800"}
          fontSize={12}
          position="absolute"
          bottom={5}
        >
          by PTL
        </Text>
      </Box>
    </View>
  );
};

export default Box2;
