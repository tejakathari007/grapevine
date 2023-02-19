import React, { useMemo } from "react";
import { Box, Center, Text, Image, Flex, Pressable } from "native-base";
import PostHeader from "./PostComponents/PostHeader";
import CommentsContainer from "./PostComponents/CommentsContainer";
import LikeContainer from "./PostComponents/LikeContainer";
import Footer from "./PostComponents/Footer";

const PostV2 = ({
  data,
  user,
  navigation,
  showLike = true,
  showComment = true,
  shared,
  index,
  setIndex,
}) => {
  const time = useMemo(() => {
    const date1 = new Date(data.created_at);
    const date2 = new Date();

    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.floor(diffInTime / oneDay);

    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return "few moments ago";
    else if (diffInMin < 60) return diffInMin + " min ago";
    else if (diffInMin < 1140) return Math.floor(diffInMin / 60) + " hour ago";
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }, [data]);
  return (
    <Box w="100%" mb={"12"} borderRadius="md">
      <Box py="2">
        <PostHeader
          username={data.username}
          profile_pic={data.user.profile_pic}
          user_uuid={data.user_uuid}
          navigation={navigation}
          address={user.address}
          shared={shared}
        />
      </Box>
      <Box w="100%" px="5" mb={data.post.length < 100 ? "20" : "5"}>
        <Text fontSize="md" fontWeight="600" fontFamily="light">
          "{data?.post}"
        </Text>
      </Box>
      {showLike && (
        <Box>
          <LikeContainer
            liked={data.liked}
            post_uuid={data.uuid}
            user={user}
            timeStamp={time}
            count={data.like_count}
            index={index}
            setIndex={setIndex}
          />
        </Box>
      )}
      {showComment && (
        <Box p="2">
          <Footer post={data} user={user} index={index} setIndex={setIndex} />
        </Box>
      )}
    </Box>
  );
};

export default PostV2;
