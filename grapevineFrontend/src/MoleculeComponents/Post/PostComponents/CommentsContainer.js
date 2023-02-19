import React from "react";
import { Box, Flex, Text, Input, Pressable } from "native-base";
import RoundImage from "../../../AtomComponents/Image/RoundImage";
import { useNavigation } from "@react-navigation/native";

const CommentsContainer = ({ comments, post_uuid }) => {
  const data = [1, 2];

  const totalComments = comments?.length;
  const navigation = useNavigation();

  return (
    <Box w="100%">
      <Pressable
        onPress={() => {
          if (navigation) {
            navigation.navigate("CommentPage", {
              comments: comments,
              post_uuid: post_uuid,
            });
          }
        }}
      >
        {[...comments].splice(0, 3).map((d) => {
          return (
            <Flex direction="row" key={d.uuid}>
              <Text fontSize="12" fontWeight="700" fontFamily="bold">
                {d.user.username}{" "}
              </Text>
              <Text fontSize="12" fontWeight="400" fontFamily="light">
                {d.comment_text}
              </Text>
            </Flex>
          );
        })}

        <Box>
          {totalComments > 3 ? (
            <Text fontSize="12" color="gray.500" fontFamily="light">
              View all {comments.length} comments
            </Text>
          ) : (
            <Text fontSize="12" color="gray.500" fontFamily="light">
              Add a comment
            </Text>
          )}
        </Box>
      </Pressable>
    </Box>
  );
};

export default CommentsContainer;
