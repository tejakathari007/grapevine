import React, { useState } from "react";
import { View, Text, Center, Pressable } from "native-base";
import { AtomComponents, Modal, Layout, Hooks } from "../../Exports/index";
import { TextBold } from "../../AtomComponents";
import GetTiktokInfo from "../../Hooks/Tiktok/getTiktokInfo";
import GetGoogleInfo from "../../Hooks/Google/getGoogleInfo";
import GetInstagramInfo from "../../Hooks/Instagram/getInstagramInfo";
const ContinueWith = ({ navigation }) => {
  const { ButtonDark, RegularImage, Logo } = AtomComponents;
  const { InstagramLoginModel, TiktokLoginModel } = Modal;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const [showInstaModal, setShowInstaModal] = useState(false);
  const { registerData, setRegisterData } = Hooks.ContextHook();
  const { tiktokLogin } = GetTiktokInfo();
  const googleLogin = GetGoogleInfo();
  const instagramLogin = GetInstagramInfo();

  const instagramLoginSuccess = (token) => {
    setRegisterData({ ...registerData, instagramToken: token });
    navigation.navigate("EnterEmail");
  };

  const googleLoginSuccess = (user_info) => {
    setRegisterData({
      ...registerData,
      google_token: user_info.token,
      email: user_info.email,
      google_refresh_token: user_info.google_refresh_token,
    });
    navigation.navigate("AccountType");
  };
  const tiktokLoginSuccess = ({ token, videos, refresh_token, open_id }) => {
    setRegisterData({
      ...registerData,
      tiktokToken: token,
      tiktok_refresh_token: refresh_token,
      tiktok_open_id: open_id,
    });
    navigation.navigate("EnterEmail");
  };
  // const instagramLoginSUccess = (access_token) => {
  //   setRegisterData({
  //     ...registerData,
  //     tiktokToken: token,
  //     tiktok_refresh_token: refresh_token,
  //     tiktok_open_id: open_id,
  //   });
  //   navigation.navigate("EnterEmail");
  // };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <InstagramLoginModel
            show={showInstaModal}
            close={() => setShowInstaModal(false)}
            loginSuccess={(d) => instagramLoginSuccess(d)}
          />
          <Center>
            <View w="80%" p="5">
              <View alignItems={"center"} mb="5">
                <Logo w={200} h={150} />
              </View>
              <Pressable onPress={() => instagramLogin(instagramLoginSuccess)}>
                <Center
                  h="50"
                  w="100%"
                  bg="#fff"
                  my={1}
                  borderRadius="full"
                  flexDirection={"row"}
                >
                  <RegularImage
                    image={require("../../../assets/Icons/instagram_color.png")}
                    h={20}
                    w={20}
                  />
                  <Text fontSize={14} fontWeight="800" fontFamily="bold">
                    Continue with Instagram
                  </Text>
                </Center>
              </Pressable>
              <Pressable onPress={() => tiktokLogin(tiktokLoginSuccess)}>
                <Center
                  h="50"
                  w="100%"
                  bg="#fff"
                  my={1}
                  borderRadius="full"
                  flexDirection={"row"}
                >
                  <RegularImage
                    image={require("../../../assets/Icons/tiktok_color.png")}
                    h={20}
                    w={20}
                  />
                  <Text fontSize={14} fontWeight="800" fontFamily="bold">
                    Continue with TikTok
                  </Text>
                </Center>
              </Pressable>
              <Pressable onPress={() => googleLogin(googleLoginSuccess)}>
                <Center
                  h="50"
                  w="100%"
                  bg="#fff"
                  my={1}
                  borderRadius="full"
                  flexDirection={"row"}
                >
                  <RegularImage
                    image={require("../../../assets/Icons/google.png")}
                    h={20}
                    w={20}
                  />
                  <Text fontSize={14} fontWeight="800" fontFamily="bold">
                    Continue with Google
                  </Text>
                </Center>
              </Pressable>
              <ButtonDark onPress={() => navigation.navigate("EnterEmail")}>
                Continue with Email
              </ButtonDark>
              <ButtonDark
                onPress={() => navigation.navigate("EnterPhoneNumber")}
              >
                Continue with Phone Number
              </ButtonDark>
            </View>
          </Center>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default ContinueWith;
