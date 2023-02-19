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
const CollaborationHistory = (props) => {
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
              Collaboration History
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
      </Box>
    </BackLayout>
  );
};

export default CollaborationHistory;
