import React, { useEffect, useState, useContext } from "react";

import { Box, Spinner, Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../../API";
import { ActivityIndicator } from "react-native";
import { Layout, PageComponent } from "../../../Exports/index";
import GetUser from "../../../Hooks/User/getUserInfo";
const OtherProfile = ({ navigation, user_uuid }) => {
  const {
    Profile: { HeaderContainer, TabContainer, NetworkContainer },
  } = PageComponent;
  const { SignInLayout } = Layout;

  const user_info = GetUser(user_uuid);

  // return (
  //   <Center h="100%" w="100%">
  //     <Spinner />
  //   </Center>
  // );
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
    <SignInLayout>
      <Box w="100%" h="100%">
        <Box pl="2">
          <AntDesign
            name="arrowleft"
            size={30}
            color="black"
            onPress={() => navigation.pop()}
          />
        </Box>
        {/* <SlideShow
          show={show}
          close={() => setShow(false)}
          component={<Text>hello</Text>}
        /> */}
        <Box w="100%" h="100%" bg="theme.bg">
          <HeaderContainer navigation={navigation} user={user_info.data} />
          <NetworkContainer user={user_info.data} />
          <TabContainer
            tiktokPost={user_info.data?.tiktokPost}
            posts={user_info.data.posts}
            user={user_info.data}
            activities={user_info.data?.activities.slice(0, 3)}
            navigation={navigation}
          />
        </Box>
      </Box>
    </SignInLayout>
  );
};
export default OtherProfile;
