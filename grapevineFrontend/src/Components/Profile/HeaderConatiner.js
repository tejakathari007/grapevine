import { Box, Text, Avatar, Divider, Button } from "native-base";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../API";
import { useState, useEffect, useContext } from "react";
import { UserValue } from "../../Context/UserContext";
import { useMemo } from "react";
import ConnectButton from "../../MoleculeComponents/User/ConnectButton";
const HeaderContainer = (props) => {
  const {
    user: {
      username,
      image,
      engagement_type,
      fname,
      lname,
      uuid,
      friendship_status,
      _count,
      description,
      chatroom,
      profile_pic,
    },
    navigation,
  } = props;
  return (
    <Box w="full" p="5">
      <Box flex="1" flexDir="row">
        <Box
          alignSelf="center"
          justifyContent="center"
          mr="5"
          alignContent="center"
        >
          <Avatar
            alignSelf="center"
            justifyContent="center"
            source={{
              uri: profile_pic
                ? `https://admin.grapevine-app.co/api/file/${profile_pic}`
                : "https://wallpaperaccess.com/full/317501.jpg",
            }}
            size="20"
          />
          <Text
            textAlign="center"
            bg="primary"
            color="#fff"
            borderRadius={"md"}
            mt="2"
          >
            {/* TODO bipul  colors*/}
            {engagement_type == "User" ? "Creator" : "Brand"}{" "}
            <AntDesign name="check" size={12} color="white" />
          </Text>
          <Text
            fontWeight="bold"
            fontSize="12"
            mt="2"
            textAlign="center"
          >{`${fname} ${lname}`}</Text>
        </Box>
        <Box flex="0.70">
          <Text fontWeight="bold" mb="2">
            @{username}
          </Text>
          <Box flex="1" flexDir="row">
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {_count.posts ?? "2K"}
              </Text>
              <Text fontSize="10">Posts</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {_count.followers ?? "4M"}
              </Text>
              <Text fontSize="10">Followers</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {_count.connections ?? "100+"}
              </Text>
              <Text fontSize="10">Connections</Text>
            </Box>
          </Box>
          <Box mt="2">
            <Text fontSize="10" fontWeight="bold" mb="1">
              Top 5.8% of all creators
            </Text>

            <Box flexDir="row" justifyContent="space-between">
              <ConnectButton
                friendship_status={friendship_status}
                user_uuid={uuid}
                h="7"
                pt="0"
                pb="0"
                bg="primary"
                flex="0.45"
              />
              {chatroom[0] ? (
                <Button
                  onPress={() =>
                    navigation.navigate("Chatroom", {
                      username: chatroom[0].name
                        ? chatroom[0].name
                        : chatroom[0].user[0].username,
                      chatroom_uuid: chatroom[0].uuid,
                      valid_room: chatroom[0].valid_room,
                    })
                  }
                  h="7"
                  pt="0"
                  pb="0"
                  bg="primary"
                  flex="0.45"
                >
                  Message
                </Button>
              ) : (
                <Button
                  onPress={() =>
                    Alert.alert("", "You need to be friend to send message")
                  }
                  h="7"
                  pt="0"
                  pb="0"
                  bg="primary"
                  flex="0.45"
                >
                  Message
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text fontSize="12" color="gray.500" pt="2">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export default HeaderContainer;
