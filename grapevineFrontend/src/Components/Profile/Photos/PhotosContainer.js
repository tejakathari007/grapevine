import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex } from "native-base";
import Photo from "./photo";
import Tiktokvideo from "../../../AtomComponents/TiktokWebview/Tiktokvideo";
export default function PhotosContainer({ posts }) {
  return (
    <Flex
      direction="row"
      justifyContent={"space-around"}
      flexWrap="wrap"
      mt={1}
    >
      {posts.length > 0 ? (
        posts.map((post) => {
          return <Photo post={post} key={post.uuid} />;
        })
      ) : (
        <Text textAlign={"center"} w="100%">
          No Videos
        </Text>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    padding: 1,
  },
});
