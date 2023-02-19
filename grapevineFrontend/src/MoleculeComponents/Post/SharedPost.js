import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Center,
  Text,
  Image,
  Flex,
  Spinner,
  Pressable,
} from "native-base";
import PostHeader from "./PostComponents/PostHeader";
import CommentsContainer from "./PostComponents/CommentsContainer";
import LikeContainer from "./PostComponents/LikeContainer";
import { grapevineBackend } from "../../API";
import PostV2 from "./PostV2";
import GetPost from "../../Hooks/Posts/getPost";
import { TiktokPost } from "..";
import Footer from "./PostComponents/Footer";
import YoutubePost from "./YoutubePost";
import InstagramPost from "./InstagramPost";
const SharedPost = ({
  data,
  user,
  navigation,
  showLike = true,
  showComment = true,
  index,
  setIndex,
}) => {
  // console.log(data, "shared");
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

  const sharedPost = GetPost(data.shared_post_uuid);
  if (sharedPost.isLoading) {
    return <Spinner accessibilityLabel="Loading" />;
  }
  if (sharedPost.isError) {
    return <Text>error</Text>;
  }

  return (
    <Box w="100%" mb="12">
      <Box py="2">
        <PostHeader
          username={data?.username}
          profile_pic={data.user.profile_pic}
          user_uuid={data.user_uuid}
          navigation={navigation}
          address={user.address}
        />
      </Box>

      <Box w="100%" pl="5">
        {sharedPost.data &&
          (sharedPost.data.post_type == "text" ? (
            <PostV2
              showLike={false}
              showComment={false}
              showProduct={false}
              data={sharedPost.data}
              user={user}
              navigation={navigation}
              shared
            />
          ) : sharedPost.data.post_type == "tiktok" ? (
            <TiktokPost
              showLike={false}
              showComment={false}
              data={sharedPost.data}
              user={user}
              navigation={navigation}
            />
          ) : sharedPost.data.post_type == "youtube" ? (
            <YoutubePost
              showLike={false}
              showComment={false}
              data={sharedPost.data}
              user={user}
              navigation={navigation}
            />
          ) : (
            <InstagramPost
              showLike={false}
              showComment={false}
              data={sharedPost.data}
              user={user}
              navigation={navigation}
            />
          ))}
      </Box>

      {showLike && (
        <Box>
          <LikeContainer
            liked={data.liked}
            post_uuid={data.uuid}
            user={user}
            timeStamp={time}
            count={data.like_count}
            shared_post_uuid={data.shared_post_uuid}
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

export default SharedPost;
