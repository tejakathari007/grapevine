import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Flex,
  Text,
  Pressable,
  Center,
  Image,
  Spinner,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { MolecularComponents, Layout } from "../../Exports/index";
import GetNotofication from "../../Hooks/Notification/getNotification";
const NotificationPage = ({ navigation }) => {
  const { Notification } = MolecularComponents;
  const { SignInLayout, BackLayout } = Layout;
  const notification = GetNotofication();
  if (notification.isLoading) {
    return <Spinner />;
  }
  if (notification.isError || !notification.data?.pages[0].result.length > 0)
    return (
      <Center h="100%" w="100%">
        <Image
          source={require("../../../assets/Logo/Logo.png")}
          size={100}
          resizeMode="contain"
          p="5"
          alt="Image"
        />
        <Text
          fontSize="16"
          fontWidth="800"
          color="primary"
          mt="10"
          fontFamily="bold"
        >
          Sorry, no notifications.
        </Text>
      </Center>
    );
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box h="100%" w="100%" bg="white">
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          mb="5"
          fontFamily="bold"
        >
          Notifications
        </Text>
        <Pressable onPress={() => navigation.navigate("FriendRequest")}>
          <Flex
            flexDirection={"row"}
            justifyContent="space-between"
            alignItems={"center"}
            bg="#3d368218"
            py={3}
            px={5}
          >
            <Text fontSize="16" fontWeight="800" color="#000" fontFamily="bold">
              Connection Requests
            </Text>

            <AntDesign name="caretright" size={12} color="#000" />
          </Flex>
        </Pressable>
        <SignInLayout>
          <Box h="100%" w="100%" p="2">
            {notification.data?.pages.map((page) =>
              page.result.map((_notification, index) => (
                <Notification
                  key={_notification.uuid}
                  notification={_notification}
                  navigation={navigation}
                />
              ))
            )}
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default NotificationPage;
