import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Flex,
  Center,
  Box,
  Radio,
  Pressable,
  Input,
  Spinner,
  Button,
  Image,
} from "native-base";
import { ActivityIndicator, Alert } from "react-native";
import { grapevineBackend } from "../../API/ci.axios";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";
import { ButtonDark } from "../../AtomComponents";
import RegisterUser from "../../Hooks/User/registerUser";

const EnterJobTitle = ({ navigation }) => {
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { Logo, ButtonLight, InputUsername } = AtomComponents;
  const registerUser = RegisterUser();
  const { registerData, setRegisterData, user, setUser } = Hooks.ContextHook();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const register = () => {
    if (!registerUser.isLoading) {
      registerUser.mutate({
        ...registerData,
        passwordConfirm: registerData.password,
        intrests: registerData.intrests,
        role: role,
      });
    }
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box
            pt={"15%"}
            px="2%"
            justifyContent={"space-between"}
            pb={30}
            h="90%"
          >
            <Flex direction="column" justifyContent={"space-between"}>
              <View>
                <Box w="100%" alignItems={"center"}>
                  <Logo />
                  <Text
                    fontSize={17}
                    color="#fff"
                    fontWeight={"800"}
                    textAlign="center"
                    mt={5}
                    fontFamily="bold"
                  >
                    What is your role?
                  </Text>
                  <Text
                    fontSize={13}
                    fontWeight="300"
                    color="#fff"
                    mt={5}
                    fontFamily="light"
                    textAlign={"center"}
                  >
                    What is your job title at this business? e.g ‘Talent
                    manager’
                  </Text>
                </Box>
                <Center>
                  <Text
                    fontSize={10}
                    fontWeight="800"
                    color="#fff"
                    fontFamily="light"
                    textAlign={"left"}
                    w="90%"
                    mt={5}
                  >
                    Job title
                  </Text>
                  <Input
                    color="#fff"
                    borderRadius={"md"}
                    h={8}
                    w={"90%"}
                    placeholder="Role"
                    borderWidth={0}
                    borderBottomWidth={2}
                    borderBottomColor="dark"
                    value={role}
                    onChangeText={(text) => setRole(text)}
                  />
                </Center>
              </View>
            </Flex>
            <Center>
              {role.length > 0 ? (
                <ButtonDark onPress={register}>
                  {registerUser.isLoading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <Text fontSize={14} color="#fff" fontWeight={"800"}>
                      Submit
                    </Text>
                  )}
                </ButtonDark>
              ) : (
                <ButtonLight>
                  <Text
                    fontSize={12}
                    fontWeight="800"
                    color="#fff"
                    fontFamily="light"
                    textAlign={"left"}
                  >
                    Submit
                  </Text>
                </ButtonLight>
              )}
            </Center>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default EnterJobTitle;
