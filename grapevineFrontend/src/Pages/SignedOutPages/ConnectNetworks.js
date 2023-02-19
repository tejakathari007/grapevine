import React, { useState, useContext } from "react";
import { Box, View, Flex, Center, Text, Pressable } from "native-base";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AtomComponents, Modal, Layout, Hooks } from "../../Exports/index";
import GetInstagramInfo from "../../Hooks/Instagram/getInstagramInfo";

const ConnectNetworks = ({ navigation }) => {
  const { ButtonDark, ColorWrapper, RegularImage, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { TiktokLoginModel, InstagramLoginModel } = Modal;
  const [showInstaModal, setShowInstaModal] = useState(false);
  const [showTiktokModal, setShowTiktokModal] = useState(false);
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const instagramLogin = GetInstagramInfo();

  const tiktokLoginSuccess = ({ token, posts, refresh_token }) => {
    setRegisterData({
      ...registerData,
      tiktokToken: token,
      tiktokPost: posts,
      tiktok_refresh_token: refresh_token,
    });
  };
  const instagramLoginSuccess = (token) => {
    setRegisterData({ ...registerData, instagramToken: token });
    navigation.navigate("EnterEmail");
  };
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <InstagramLoginModel
            show={showInstaModal}
            close={() => setShowInstaModal(false)}
            loginSuccess={(d) => instagramLoginSuccess(d)}
          />
          <TiktokLoginModel
            show={showTiktokModal}
            close={() => setShowTiktokModal(false)}
            loginSuccess={(d) => tiktokLoginSuccess(d)}
          />
          <Box pt="15%" px={5} pb="30">
            <Box>
              <View>
                <View w="100%" alignItems="center">
                  <Logo />
                  <Text
                    fontSize="17"
                    color="#fff"
                    fontWeight="800"
                    textAlign="center"
                    mt="2"
                    fontFamily="bold"
                  >
                    Connect your network
                  </Text>
                </View>
                <Center>
                  <Center mt={19} w="80%">
                    <Flex
                      flexDirection="row"
                      justifyContent="space-around"
                      w="70%"
                      mb="10"
                    >
                      <Pressable
                        onPress={() => instagramLogin(instagramLoginSuccess)}
                      >
                        <ColorWrapper>
                          <RegularImage
                            h={30}
                            w={30}
                            image={require("../../../assets/Icons/Instagram_light.png")}
                          />
                        </ColorWrapper>
                        {registerData.instagramToken && (
                          <Center>
                            <AntDesign
                              name="check"
                              size={18}
                              color="#00ff00"
                              p="2"
                            />
                          </Center>
                        )}
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          Alert.alert("Error", "This feature is comming soon")
                        }
                      >
                        <ColorWrapper>
                          <RegularImage
                            h={30}
                            w={30}
                            image={require("../../../assets/Icons/Youtube_light.png")}
                          />
                        </ColorWrapper>
                        {registerData.google_token && (
                          <Center>
                            <AntDesign
                              name="check"
                              size={18}
                              color="#00ff00"
                              p="2"
                            />
                          </Center>
                        )}
                      </Pressable>
                      <Pressable onPress={() => setShowTiktokModal(true)}>
                        <ColorWrapper>
                          <RegularImage
                            h={30}
                            w={30}
                            image={require("../../../assets/Icons/TikTok_light.png")}
                          />
                        </ColorWrapper>
                        {registerData.tiktokToken && (
                          <Center>
                            <AntDesign
                              name="check"
                              size={18}
                              color="#00ff00"
                              p="2"
                            />
                          </Center>
                        )}
                      </Pressable>
                    </Flex>
                    <ButtonDark
                      onPress={() => navigation.navigate("EnterUsername")}
                    >
                      <Text
                        fontSize={14}
                        color="#fff"
                        fontWeight={"800"}
                        fontFamily="bold"
                      >
                        Next
                      </Text>
                    </ButtonDark>
                    <Pressable
                      onPress={() => navigation.navigate("EnterUsername")}
                    >
                      <Text
                        fontSize="14"
                        color="#fff"
                        fontWeight="300"
                        mt="5"
                        fontFamily="light"
                        underline
                      >
                        Skip
                      </Text>
                    </Pressable>
                  </Center>
                </Center>
              </View>
            </Box>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default ConnectNetworks;
