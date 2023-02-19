import {
  View,
  Text,
  Center,
  Box,
  Input,
  Flex,
  Spinner,
  ScrollView,
} from "native-base";
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
import GetLoginUser from "../../../Hooks/User/getLoginUser";
import { ActivityProfile } from "../../../MoleculeComponents/index";

const { SignInLayout, BackLayout } = Layout;
const Activity = (props) => {
  const user_info = GetLoginUser();
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
              Your Acitivity
            </Text>
          </Box>
        </Box>
        <ScrollView>
          {user_info.data?.activities?.length >= 1 ? (
            user_info.data.activities.map((activity) => {
              return (
                <ActivityProfile
                  activity={activity}
                  navigation={props.navigation}
                  key={activity.uuid}
                />
              );
            })
          ) : (
            <Center>
              <Text>No Activities</Text>
            </Center>
          )}
        </ScrollView>
      </Box>
    </BackLayout>
  );
};

export default Activity;
