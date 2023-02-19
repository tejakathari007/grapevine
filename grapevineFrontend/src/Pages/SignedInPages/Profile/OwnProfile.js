import React, { useEffect, useState, useContext } from "react";
import Toast from "react-native-root-toast";
import { Box, Center, Spinner, Text } from "native-base";
import { grapevineBackend } from "../../../API";
import { UserValue } from "../../../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import SlideShow from "../../../Components/Profile/SlideShow";

import { Layout, PageComponent, Modal } from "../../../Exports/index";
import GetLoginUser from "../../../Hooks/User/getLoginUser";

const OwnProfile = ({ navigation }) => {
  const {
    Profile_Own: { HeaderContainer, TabContainer, NetworkContainer },
  } = PageComponent;
  const { TiktokLoginModel } = Modal;
  const { SignInLayout } = Layout;
  const [user, setUser] = useContext(UserValue);
  const [showTiktokModal, setShowTiktokModal] = useState(false);

  const user_info = GetLoginUser();
  const tiktokLoginSuccess = ({ token, posts, refresh_token }) => {
    setShowTiktokModal(false);
    Toast.show("loading", {
      duration: Toast.durations.SHORT,
    });
    grapevineBackend(
      "/tiktok/connect",
      {
        user_uuid: user.uuid,
        tiktokToken: token,
        tiktokPost: posts,
        tiktok_refresh: refresh_token,
      },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setUser({ ...user, ...data.data });
        } else {
          Toast.show("Something Went Wrong", {
            duration: Toast.durations.SHORT,
          });
        }
      })
      .catch((err) =>
        Toast.show("Something Went Wrong", {
          duration: Toast.durations.SHORT,
        })
      );
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser({ ...{ data: true } });
  };

  if (user_info.isLoading || user_info.isRefetching) {
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
  // return <></>;
  return (
    <SignInLayout>
      <TiktokLoginModel
        show={showTiktokModal}
        close={() => setShowTiktokModal(false)}
        loginSuccess={(d) => tiktokLoginSuccess(d)}
      />
      <Box w="100%" h="100%">
        <Box w="100%" h="100%">
          <HeaderContainer
            navigation={navigation}
            user={user_info.data}
            logout={logout}
          />
          <NetworkContainer
            setShowTiktokModal={setShowTiktokModal}
            user={user_info.data}
          />
          <TabContainer
            tiktokPost={user_info.data?.tiktokPost}
            user={user_info.data}
            activities={user_info.data?.activities?.splice(0, 3)}
            navigation={navigation}
          />
        </Box>
      </Box>
    </SignInLayout>
  );
};
export default OwnProfile;
