import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Image,
  Center,
  Spinner,
  ScrollView,
  Pressable,
} from "native-base";
import { UserValue } from "../../Context/UserContext";

import { AtomComponents, Layout, PageComponent } from "../../Exports/index";
import GetAllFriends from "../../Hooks/Friend/getAllFriend";
import CreateChatroom from "../../Hooks/Chatroom/createChatroom";

const CreateGroup = ({ navigation }) => {
  const [searchParams, setSearchParams] = useState("");
  const [user, setUser] = useContext(UserValue);
  const [groupMember, setGroupMember] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { SignInLayout, BackLayout } = Layout;
  const { Input, Search } = AtomComponents;
  const friends = GetAllFriends(searchParams);
  const createChatroom = CreateChatroom();

  const createGroup = () => {
    if (groupName && groupMember.length > 0) {
      const users = groupMember.map((member) => {
        return { uuid: member.user_uuid };
      });
      createChatroom.mutate({ users: users, name: groupName });
    }
  };

  const filterUser = (text) => {
    setSearchParams(text);
  };

  const getIndex = (user) => {
    return groupMember.findIndex((member) => {
      return member.user_uuid === user.user_uuid;
    });
  };
  const selectUser = (user) => {
    const index = getIndex(user);
    if (index == -1) {
      setGroupMember((member) => [user, ...member]);
    } else {
      const member = [...groupMember];
      member.splice(index, 1);
      setGroupMember([...member]);
    }
  };

  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box h="100%" w="100%" bg="white" pb={10} px={"10%"}>
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          mb="5"
          fontFamily="bold"
        >
          Create Group
        </Text>
        <Box flex={1} pt={5}>
          <Text fontWeight="400" fontSize={"sm"} fontFamily="bold">
            Group Name:
          </Text>
          <Input
            color="#000"
            placeholder={"Group Name"}
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
          />
          <Text fontWeight="400" fontSize={"sm"} fontFamily="bold">
            To:
          </Text>
          <Box>
            <Search onSearch={filterUser} />
          </Box>
          <Text
            fontWeight="800"
            fontSize={16}
            textAlign="center"
            mb="5"
            fontFamily="bold"
          >
            Friends
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {friends.isLoading ? (
              <Spinner />
            ) : (
              friends.data?.pages.map((page) =>
                page.result.map((member, index) => {
                  if ((member.type = "Creator"))
                    return (
                      <Pressable
                        key={member.uuid}
                        onPress={() => selectUser(member)}
                      >
                        <Flex
                          direction="row"
                          justifyContent={"space-between"}
                          alignItems="center"
                          m={2}
                        >
                          <Flex
                            direction="row"
                            justifyContent={"flex-start"}
                            alignItems="center"
                            m={2}
                          >
                            <Image
                              source={require("../../../assets/Images/1.png")}
                              height={10}
                              w={10}
                              alt={"image"}
                              borderRadius="full"
                            />
                            <Box ml={2}>
                              <Text
                                fontWeight="400"
                                fontSize={"md"}
                                fontFamily="bold"
                              >
                                @ {member.username}
                              </Text>
                              <Text
                                fontWeight="400"
                                fontSize={10}
                                fontFamily="bold"
                                ml={5}
                              >
                                {member.fname + " " + member.lname}
                              </Text>
                            </Box>
                          </Flex>
                          <Flex
                            h={5}
                            w={5}
                            borderWidth={1}
                            borderColor="#d3d3d3"
                            borderRadius="full"
                            direction="row"
                            justifyContent={"center"}
                            alignItems="center"
                          >
                            <Box
                              bg={getIndex(member) == -1 ? "white" : "gray.400"}
                              h={3}
                              w={3}
                              borderRadius="full"
                            ></Box>
                          </Flex>
                        </Flex>
                      </Pressable>
                    );
                  return <></>;
                })
              )
            )}
          </ScrollView>
        </Box>
        {createChatroom.isLoading ? (
          <Button bg="primary">
            <Spinner />
          </Button>
        ) : (
          <Button bg="primary" onPress={createGroup}>
            Create
          </Button>
        )}
      </Box>
    </BackLayout>
  );
};

export default CreateGroup;
