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
  FlatList,
} from "native-base";
import { ActivityIndicator, Alert } from "react-native";
import { AtomComponents, Layout, Hooks } from "../../../Exports/index";
import { ButtonDark } from "../../../AtomComponents";
const { describeTags } = require("../../../StaticData/describeTag.js");

import RegisterUser from "../../../Hooks/User/registerUser";

const DescribeYouBrand = ({ navigation }) => {
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { Logo, ButtonLight, InputUsername } = AtomComponents;
  const { registerData, setRegisterData, user, setUser } = Hooks.ContextHook();
  const [tags, setTags] = useState([...describeTags]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const select = (tag) => {
    setRegisterData({ ...registerData, brand_type: tag });
  };
  const registerUser = RegisterUser();

  const register = () => {
    if (!loading) {
      setLoading(true);
      registerUser.mutate({
        ...registerData,
        passwordConfirm: registerData.password,
        intrests: registerData.intrests,
      });
    }
  };
  useEffect(() => {
    setTags([
      ...describeTags.filter((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      ),
    ]);
  }, [search]);
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt={"15%"} px="2%" justifyContent={"space-between"} pb={30}>
            <Flex direction="column" justifyContent={"space-between"}>
              <View>
                <Box w="100%" alignItems={"center"}>
                  <Logo />
                  <Text
                    fontSize={17}
                    color="#fff"
                    fontWeight={"800"}
                    textAlign="center"
                    mt={10}
                    fontFamily="bold"
                  >
                    What best describes your brand?
                  </Text>
                  <Text
                    fontSize={13}
                    fontWeight="300"
                    color="#fff"
                    mt={5}
                    fontFamily="light"
                  >
                    Categories help people find accounts like yours. You can
                    change this at any time
                  </Text>
                </Box>
                <Center>
                  <Input
                    mt={5}
                    color="#fff"
                    borderRadius={"md"}
                    bg="primary"
                    h={8}
                    w={"90%"}
                    placeholder="Search"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                  />
                </Center>
                <Box my={5} p={2}>
                  <FlatList
                    h={"30%"}
                    data={tags}
                    renderItem={({ item }) => {
                      return (
                        <Pressable key={item} onPress={() => select(item)}>
                          <Flex
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            m={2}
                          >
                            <Text
                              fontSize={12}
                              color="#fff"
                              fontWeight={"800"}
                              fontFamily="bold"
                            >
                              {item}
                            </Text>
                            <Box
                              h={5}
                              w={5}
                              borderRadius="full"
                              bg={
                                registerData.brand_type &&
                                registerData.brand_type == item
                                  ? "dark"
                                  : "transparent"
                              }
                              borderWidth={1}
                            ></Box>
                          </Flex>
                        </Pressable>
                      );
                    }}
                  />
                </Box>
              </View>
              <View style={{ margin: 30 }}>
                {registerData.brand_type ? (
                  <ButtonDark onPress={register}>
                    <Text fontSize={14} color="#fff" fontWeight={"800"}>
                      Confirm
                    </Text>
                  </ButtonDark>
                ) : (
                  <ButtonLight>
                    <Text fontSize={14} color="#fff" fontWeight={"800"}>
                      Confirm
                    </Text>
                  </ButtonLight>
                )}
              </View>
            </Flex>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default DescribeYouBrand;
