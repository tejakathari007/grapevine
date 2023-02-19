import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Pressable,
  Text,
  View,
  Modal,
  Button,
  Center,
} from "native-base";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SharePost from "../../../Hooks/Posts/sharePost";
import LikePost from "../../../Hooks/Like/likePost";
import UnLikePost from "../../../Hooks/Like/unLikePost";
import { useNavigation } from "@react-navigation/native";
const LikeContainer = ({
  liked,
  user,
  post_uuid,
  timeStamp,
  count,
  shared_post_uuid = null,
  index,
  setIndex,
}) => {
  const navigation = useNavigation();

  const likePost = LikePost();
  const unlikePost = UnLikePost();
  const handleLike = async () => {
    if (liked) {
      unlikePost.mutate({
        post_uuid: post_uuid,
        user_uuid: user.uuid,
      });
    } else {
      likePost.mutate({
        post_uuid: post_uuid,
        user_uuid: user.uuid,
      });
    }
  };

  const handleShare = () => {
    if (shared_post_uuid) {
      navigation.navigate("SharePost", { post_uuid: shared_post_uuid });
    } else {
      navigation.navigate("SharePost", { post_uuid: post_uuid });
    }
  };

  return (
    <Box>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        w="100%"
        mt="10px"
        borderTopWidth="1"
        borderBottomWidth="1"
        borderColor="gray.200"
        px="3"
        py="2"
      >
        <Box w="3/4">
          <Box
            display="flex"
            flexDir={"row"}
            justifyContent="space-between"
            w="full"
          >
            <Pressable onPress={handleLike} alignItems="center">
              {liked ? (
                <AntDesign name="heart" size={20} color="red" p="2" />
              ) : (
                <AntDesign name="hearto" size={20} color="black" p="2" />
              )}
              <Text fontSize="8" fontFamily="bold">
                Interaction
              </Text>
            </Pressable>
            <Pressable onPress={() => setIndex(1)}>
              <Center>
                <Ionicons
                  name="people-outline"
                  size={20}
                  color={index == 1 ? "black" : "gray"}
                />
                <Text fontSize="8" fontFamily="light">
                  People
                </Text>
              </Center>
            </Pressable>
            <Pressable onPress={() => setIndex(2)}>
              <Center>
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={20}
                  color={index == 2 ? "black" : "gray"}
                />
                <Text fontSize="8" fontFamily="light">
                  Products
                </Text>
              </Center>
            </Pressable>
            <Pressable onPress={() => setIndex(3)}>
              <Center>
                <FontAwesome name="lightbulb-o" size={20} color="gray" />
                <Text fontSize="8" fontFamily="light">
                  Inspo
                </Text>
              </Center>
            </Pressable>
            <Pressable onPress={handleShare} alignItems="center">
              <MaterialCommunityIcons
                name="share-outline"
                size={20}
                color="black"
              />
              <Text fontSize="8" fontFamily="bold">
                Share
              </Text>
            </Pressable>
          </Box>
        </Box>
      </Flex>
      <Box flex="1" flexDir="row" justifyContent="space-between" px="2" pt="2">
        <Text fontSize="12" fontWeight="800" fontFamily="bold">
          {`${count} Like${count > 1 ? "s" : ""}`}
        </Text>
        <Text fontSize="12" color="black" fontFamily="light">
          {timeStamp}
        </Text>
      </Box>
    </Box>
  );
};

export default memo(LikeContainer);
