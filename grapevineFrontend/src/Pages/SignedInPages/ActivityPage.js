import React, { useEffect, useState } from "react";
import { Box, Center, Flex, ScrollView, Text } from "native-base";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { MolecularComponents, PageComponent } from "../../Exports/index";
import GetActivity from "../../Hooks/Activity/getActivity";
const ActivityPage = ({ navigation }) => {
  const {
    Activity: { ForYou, Connected },
  } = PageComponent;
  const [component, setComponent] = useState("foryou");

  const { forYouActivities, connectedActivities } = GetActivity();

  return (
    <Box h="100%" w="100%" bg="white">
      <Box>
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          fontFamily="bold"
        >
          Activity
        </Text>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          right="5"
        >
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" color="black" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </Flex>
      </Box>

      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        m="20px"
      >
        <Pressable onPress={() => setComponent("foryou")}>
          <Text
            fontWeight={component == "foryou" ? "800" : "400"}
            mx={1}
            shadow="1"
            fontFamily={component == "foryou" ? "bold" : "light"}
          >
            For You
          </Text>
        </Pressable>
        <Text>|</Text>
        <Pressable onPress={() => setComponent("connected")}>
          <Text
            fontWeight={component == "connected" ? "800" : "400"}
            mx={1}
            shadow="1"
            fontFamily={component == "connected" ? "bold" : "light"}
          >
            Connected
          </Text>
        </Pressable>
      </Flex>

      <ScrollView>
        <Box h="100%" w="100%">
          {component == "connected" ? (
            <Connected
              connectedActivities={connectedActivities}
              navigation={navigation}
            />
          ) : (
            <ForYou
              forYouActivities={forYouActivities}
              navigation={navigation}
            />
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ActivityPage;
