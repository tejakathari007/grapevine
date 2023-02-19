import React, { useState } from "react";
import { Box, Center, Text, Flex, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import RoundImage from "../../../AtomComponents/Image/RoundImage";
import { Entypo } from "@expo/vector-icons";
import { DropDownMenu } from "../../Menu/index";
import { FontAwesome5 } from "@expo/vector-icons";
const PostHeader = ({
  username,
  profile_pic,
  user_uuid,
  navigation,
  address,
  shared,
  type,
}) => {
  const styles = !shared && {
    borderTopWidth: "1",
    borderBottomWidth: "1",
    borderColor: "gray.200",
  };

  return (
    <Flex
      direction="row"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      p="1"
      px="3"
      {...styles}
    >
      <Flex direction="row" alignItems="center">
        <Pressable
          onPress={() => {
            navigation?.navigate("FriendProfile", {
              user_uuid: user_uuid,
            });
          }}
        >
          <RoundImage
            size="35"
            image={
              profile_pic
                ? {
                    uri: `https://admin.grapevine-app.co/api/file/${profile_pic}`,
                  }
                : require("../../../../assets/Images/1.png")
            }
          />
        </Pressable>
        <Box ml="2">
          <Text fontSize="md" fontFamily="bold">
            {username && username}
          </Text>
          <Text fontSize="10" fontFamily="light">
            {address}
          </Text>
        </Box>
      </Flex>

      {!shared && !type && (
        <DropDownMenu
          icon={<Entypo name="dots-three-horizontal" size={16} color="black" />}
          options={[{ text: "Report", onPress: undefined }]}
        />
      )}
      {type === "tiktok" && (
        <FontAwesome5 name="tiktok" size={24} color="black" />
      )}
    </Flex>
  );
};

const style = StyleSheet.create({
  verifiedContainer: {
    height: 13,
    width: 13,
    borderRadius: 3,
    backgroundColor:
      "gradient(90deg, rgba(81,98,241,1) 0%, rgba(121,73,231,1) 100%)",
    justifyContent: "center",
    alignItems: "center",
  },
  tickIcon: {
    position: "relative",
    height: 13,
    width: 13,
  },
});
export default PostHeader;
