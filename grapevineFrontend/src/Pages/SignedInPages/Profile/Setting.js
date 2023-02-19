import { View, Text, Center, Box, Input, Flex } from "native-base";
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
const Setting = (props) => {
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
              Setting
            </Text>
          </Box>
        </Box>
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
        <Flex flexDirection="row" p={5} justifyContent="space-between">
          <Flex flexDirection="row" alignItems={"center"}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text fontSize="18" ml={3}>
              Follow & Invite Friends
            </Text>
          </Flex>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Flex>

        <Flex flexDirection="row" p={5} justifyContent="space-between">
          <Flex flexDirection="row" alignItems={"center"}>
            <AntDesign name="unlock" size={24} color="black" />{" "}
            <Text fontSize="18" ml={3}>
              Privacy
            </Text>
          </Flex>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Flex>
        <Flex flexDirection="row" p={5} justifyContent="space-between">
          <Flex flexDirection="row" alignItems={"center"}>
            <Ionicons name="shield-checkmark-outline" size={24} color="black" />{" "}
            <Text fontSize="18" ml={3}>
              Security
            </Text>
          </Flex>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Flex>
        <Flex flexDirection="row" p={5} justifyContent="space-between">
          <Flex flexDirection="row" alignItems={"center"}>
            <Ionicons name="help-circle-outline" size={24} color="black" />{" "}
            <Text fontSize="18" ml={3}>
              Help
            </Text>
          </Flex>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Flex>
      </Box>
    </BackLayout>
  );
};

export default Setting;
