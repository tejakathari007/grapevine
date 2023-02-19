import {
  Center,
  Text,
  Flex,
  Box,
  Button,
  Spinner,
  Pressable,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import GetUser from "../../Hooks/User/getUserInfo";
import { useNavigation } from "@react-navigation/native";
import Sendfriendrequest from "../../Hooks/FriendRequest/sendFriendRequest";
import { UserValue } from "../../Context/UserContext";
import { RoundImage } from "../../AtomComponents/index";
import Acceptfriendrequest from "../../Hooks/FriendRequest/acceptFriendRequest";
import ConnectButton from "./ConnectButton";
import GetPartialUserInfo from "../../Hooks/User/getPartialUserInfo";
const UserCard = ({ user: { uuid } }) => {
  const [friendship, setFriendship] = useState(null);
  const [user, setUser] = useContext(UserValue);
  const navigation = useNavigation();
  const user_info = GetPartialUserInfo(uuid);
  const sendFriendRequest = Sendfriendrequest();
  const acceptFriendRequest = Acceptfriendrequest();
  useEffect(() => {
    if (user_info.data?.friendship_status) {
      setFriendship({ ...user_info.data.friendship_status });
      if (user_info.data.friendship_status.accepted) {
        setFriendship({
          ...user_info.data.friendship_status,
          friendship_uuid: user_info.data.friendship_status.uuid,
          status: "accepted",
          action: "none",
        });
      } else {
        if (user_info.data.friendship_status.user_accept == user.uuid) {
          setFriendship({
            ...user_info.data?.friendship_status,
            friendship_uuid: user_info.data.friendship_status.uuid,
            status: "pending",
            action: "accept",
          });
        } else {
          setFriendship({
            ...user_info.data?.friendship_status,
            friendship_uuid: user_info.data.friendship_status.uuid,
            status: "pending",
            action: "wait",
          });
        }
      }
    }
  }, [user_info.data]);

  if (user_info.isLoading || user_info.isRefetching) {
    return (
      <Box p={10}>
        <Center h="100%" w="100%">
          <Spinner accessibilityLabel="Loading" />
        </Center>
      </Box>
    );
  }

  if (user_info.isError || !user_info.data) {
    return (
      <Box p={10}>
        <Center h="100%" w="100%">
          <Text>Error</Text>E
        </Center>
      </Box>
    );
  }
  return (
    <Flex direction="row" justifyContent="space-between" m={2}>
      <Flex
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Pressable
          onPress={() =>
            navigation.navigate("FriendProfile", {
              user_uuid: uuid,
            })
          }
        >
          <RoundImage
            image={require("../../../assets/Images/3.png")}
            size={10}
          />
        </Pressable>
        <Box px={2}>
          <Text fontWeight={"800"}>{user_info.data.username}</Text>
          <Text>{user_info.data.fname + " " + user_info.data.lname}</Text>
        </Box>
      </Flex>
      <Flex
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <ConnectButton
          friendship_status={user_info.data.friendship_status}
          user_uuid={uuid}
          h="60%"
          pt="0"
          pb="0"
          bg="primary"
          mx={2}
        />
        {/* {friendship ? (
          friendship.status == "accepted" ? (
            <Button h="60%" pt="0" pb="0" bg="primary" mx={2}>
              Friends
            </Button>
          ) : friendship.action == "accept" ? (
            <Button
              h="60%"
              pt="0"
              pb="0"
              bg="primary"
              mx={2}
              onPress={() => {
                acceptFriendRequest.mutate({
                  friendship_uuid: friendship.uuid,
                  user_accept: user.uuid,
                });
              }}
            >
              Accept
            </Button>
          ) : (
            <Button h="60%" pt="0" pb="0" bg="primary" mx={2}>
              Req Sent
            </Button>
          )
        ) : (
          <Button
            h="60%"
            pt="0"
            pb="0"
            bg="primary"
            mx={2}
            onPress={() => {
              sendFriendRequest.mutate({
                user_request: user.uuid,
                user_accept: uuid,
              });
            }}
          >
            {sendFriendRequest.isLoading ? (
              <Spinner accessibilityLabel="Loading" />
            ) : (
              "Connect"
            )}
          </Button>
        )} */}

        <AntDesign name="plussquareo" size={28} color="black" />
      </Flex>
    </Flex>
  );
};

export default UserCard;
