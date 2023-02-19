import { View, Text, Center, Box, Input, Flex, Image } from "native-base";
import React, { useState } from "react";
import { Layout, Hooks } from "../../../Exports/index";
import { EvilIcons } from "@expo/vector-icons";
import {
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
const { SignInLayout, BackLayout } = Layout;
const Wallet = (props) => {
  const [text, setText] = useState("");
  return (
    <BackLayout navigation={props.navigation} color="#000" safeArea>
      <Box h="100%" w="100%" bg="#fff" mb={5}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          position="relative"
          pb="5"
          borderBottomWidth="1"
          borderBottomColor="gray.200"
        >
          <Box>
            <Text fontFamily="bold" textAlign="center">
              Wallet
            </Text>
          </Box>
        </Box>
        <Center mt={4}>
          <Text fontWeight={"800"} fontSize={17}>
            Total Earnings
          </Text>
          <Text fontWeight={"800"} fontSize={22} color="primary">
            £4,672.00
          </Text>
        </Center>
        <Center mx={4} mt={3}>
          <Input
            placeholder="Search"
            onSubmitEditing={() => {}}
            onChangeText={(text) => setText(text)}
            value={text}
            type="text"
            InputLeftElement={
              <EvilIcons name="search" size={24} color="black" />
            }
            _focus={{
              bg: "white",
              borderWidth: 1,
              borderColor: "primary",
            }}
            fontFamily="light"
          />
        </Center>
        <Text mt={2} ml={2} fontWeight="800" fontSize={12}>
          This Month
        </Text>
        {[1, 2, 3, 4].map((data) => {
          return (
            <Flex
              direction="row"
              borderRadius={10}
              p={2}
              m={2}
              key={data}
              bg="gray.100"
              borderWidth={1}
              borderColor="gray.300"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Image
                source={require("../../../../assets/Images/1.png")}
                h={16}
                w={16}
                alt="image"
              />
              <Text>LV - Damier Photoshoot</Text>
              <Text fontWeight="800">+ £750.00</Text>
            </Flex>
          );
        })}
      </Box>
    </BackLayout>
  );
};

export default Wallet;
