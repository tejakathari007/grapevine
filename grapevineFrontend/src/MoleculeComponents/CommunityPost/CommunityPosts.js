import { StyleSheet } from "react-native";
import React from "react";
import { Center, Text, View } from "native-base";
import LikeContainer from "../Post/PostComponents/LikeContainer";
import CommentsContainer from "../Post/PostComponents/CommentsContainer";
import PostHeader from "../Post/PostComponents/PostHeader";

const CommunityPosts = () => {
  return (
    <Center
      w="95%"
      pt={10}
      pb={10}
      pl={10}
      pr={10}
      mt={10}
      mb={10}
      borderRadius={"md"}
      shadow={2}
    >
      <PostHeader />
      <View mt={5} w="100%">
        <Text fontSize={15} fontWeight="300">
          “Hey Guys, does anyone know any good platform for content scheduling?
          I’m so unorganised! 😭😭😭”
        </Text>
      </View>
      <LikeContainer />
      <CommentsContainer />
    </Center>
  );
};

export default CommunityPosts;
