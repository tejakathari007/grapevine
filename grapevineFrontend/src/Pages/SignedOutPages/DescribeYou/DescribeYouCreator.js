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
import { AtomComponents, Layout, Hooks } from "../../../Exports/index";
const { describeTags } = require("../../../StaticData/describeTag.js");

const DescribeYouCreator = ({ navigation }) => {
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { Logo } = AtomComponents;
  const { registerData, setRegisterData } = Hooks.ContextHook();
  const [tags, setTags] = useState([...describeTags]);
  const [search, setSearch] = useState("");
  const select = (tag) => {
    setRegisterData({ ...registerData, creator_type: tag });
  };
  useEffect(() => {
    setTags([...describeTags.filter((tag) => tag.includes(search))]);
  }, [search]);
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout
          navigation={navigation}
          navigate="InterestsCreator"
          next
          nextDisabled={registerData.creator_type?.length <= 0}
        >
          <Box pt={"15%"} px="2%" justifyContent={"space-between"} pb={30}>
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
                  What best describes you?
                </Text>
                <Text
                  fontSize={13}
                  fontWeight="300"
                  color="#fff"
                  mt={5}
                  fontFamily="light"
                >
                  Categories help people find accounts like yours. You can
                  change this at any time{" "}
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
                  h={"10%"}
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
                              registerData.creator_type &&
                              registerData.creator_type == item
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
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default DescribeYouCreator;
