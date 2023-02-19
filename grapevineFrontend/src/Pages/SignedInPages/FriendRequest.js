import {
  View,
  Text,
  Box,
  Flex,
  Center,
  Button,
  Pressable,
  Spinner,
  Image,
} from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { UserValue } from "../../Context/UserContext";

import { AtomComponents, Layout, PageComponent } from "../../Exports/index";
import Ignorefriendrequest from "../../Hooks/FriendRequest/ignoreFriendReqest";
import Acceptfriendrequest from "../../Hooks/FriendRequest/acceptFriendRequest";
import GetFriendRequest from "../../Hooks/FriendRequest/getFriendRequests";
const FriendRequest = ({ navigation }) => {
  const {
    Explore: { Features },
  } = PageComponent;
  const { RoundImage } = AtomComponents;
  const { SignInLayout, BackLayout } = Layout;
  const [user, setUser] = useContext(UserValue);
  const ignore = Ignorefriendrequest();
  const accept = Acceptfriendrequest();
  const friend_request = GetFriendRequest(user.uuid);
  const acceptRequest = (uuid) => {
    accept.mutate({
      friendship_uuid: uuid,
      user_accept: user.uuid,
    });
  };
  const ignoreRequest = (uuid) => {
    ignore.mutate({ friendship_uuid: uuid, user_accept: user.uuid });
  };

  if (friend_request.isLoading) {
    return <Spinner />;
  }

  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box w="100%" h="100%" alignItems={"center"} bg="#fff">
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          mb="5"
          fontFamily="bold"
        >
          Connection Requests
        </Text>

        <SignInLayout>
          <View mt={5} w="full" p="2">
            {friend_request.isError || friend_request.data?.length < 1 ? (
              <>
                <Text
                  fontSize="16"
                  fontWidth="800"
                  color="primary"
                  mt="10"
                  fontFamily="bold"
                  textAlign={"center"}
                >
                  No Friend Request.
                </Text>
              </>
            ) : (
              friend_request.data.map((_friend_request) => {
                return (
                  <Box key={_friend_request.uuid} px="5">
                    <Flex
                      direction="row"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Pressable
                        onPress={() =>
                          navigation.navigate("FriendProfile", {
                            user_uuid: _friend_request.user_request,
                          })
                        }
                        flex={3}
                      >
                        <Flex
                          direction="row"
                          justifyContent={"flex-start"}
                          alignItems="center"
                        >
                          <RoundImage
                            image={require("../../../assets/Images/1.png")}
                            size={8}
                          />
                          <Text
                            fontSize={18}
                            fontWeight="600"
                            ml={2}
                            fontFamily="bold"
                          >
                            {"@" + _friend_request.username}
                          </Text>
                        </Flex>
                      </Pressable>
                      <Flex
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems="center"
                        flex={2}
                      >
                        <Button
                          onPress={() => acceptRequest(_friend_request.uuid)}
                          h="7"
                          pt="0"
                          pb="0"
                          bg="primary"
                        >
                          Accept
                        </Button>
                        <Button
                          onPress={() => ignoreRequest(_friend_request.uuid)}
                          h="7"
                          pt="0"
                          pb="0"
                          bg="red.700"
                        >
                          Ignore
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                );
              })
            )}
          </View>
          <Box mt={5} m="2">
            <Features heading="Suggested" />
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default FriendRequest;
