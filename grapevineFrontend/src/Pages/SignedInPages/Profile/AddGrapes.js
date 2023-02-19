import { View, Text, Center, Box, Input, Flex, Pressable } from "native-base";
import React, { useState } from "react";
import { Layout, Hooks } from "../../../Exports/index";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BuyGrapes from "../../../Hooks/Grapes/buyGrapes";
import GetLoginUser from "../../../Hooks/User/getLoginUser";
const { SignInLayout, BackLayout } = Layout;
const options = [
  { name: "3 Grapes", price: 8.99, number: 3 },
  { name: "12 Grapes", price: 28.99, number: 12 },
  { name: "50 Grapes", price: 67.99, number: 50 },
];
const AddGrapes = (props) => {
  const user_info = GetLoginUser();

  const buyGrapes = BuyGrapes();

  if (user_info.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner />
      </Center>
    );
  }
  if (user_info.isError || !user_info.data) {
    return (
      <Center h="100%" w="100%">
        <Text>Error</Text>
      </Center>
    );
  }
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
              Add Grapes
            </Text>
          </Box>
        </Box>
        <Center>
          <Text
            textAlign={"center"}
            mt={3}
            fontWeight="800"
            fontSize={22}
            color="black"
          >
            My Grapes: <Text color="primary">{user_info.data.grapes}</Text>
          </Text>
        </Center>
        {options.map((option) => {
          return (
            <Pressable
              key={option.name}
              onPress={() =>
                buyGrapes({
                  name: option.name,
                  price: option.price,
                  number: option.number,
                })
              }
            >
              <Center bg="primary" m={3} p={3} borderRadius={10}>
                <MaterialCommunityIcons
                  name="fruit-grapes-outline"
                  size={32}
                  color="white"
                />
                <Text
                  textAlign={"center"}
                  mt={3}
                  fontWeight="800"
                  fontSize={22}
                  color="white"
                >
                  {option.name}
                </Text>
                <Text
                  textAlign={"center"}
                  mt={3}
                  fontWeight="800"
                  fontSize={22}
                  color="green.500"
                >
                  £{option.price}
                </Text>
              </Center>
            </Pressable>
          );
        })}
      </Box>
    </BackLayout>
  );
};

export default AddGrapes;
