import React, { useState, useEffect } from "react";
import PostV2 from "./PostV2";
import TiktokPost from "./TiktokPost";
import SharedPost from "./SharedPost";
import GetPost from "../../Hooks/Posts/getPost";
import { Spinner } from "native-base";
import YoutubePost from "./YoutubePost";
import { Center, Text } from "native-base";
import InstagramPost from "./InstagramPost";

const PostContainer = ({
  post,
  navigation,
  user,
  showLike = true,
  showComment = true,
}) => {
  const [index, setIndex] = useState(0);
  const _post = GetPost(post.uuid);
  if (_post.isLoading) {
    return <Spinner accessibilityLabel="Loading" />;
  }
  if (_post.isError || !_post.data) {
    return (
      <Center>
        <Text fontSize={12} fontWeight="600">
          error
        </Text>
      </Center>
    );
  }

  if (_post.data.shared_post_uuid) {
    return (
      <SharedPost
        data={_post.data}
        navigation={navigation}
        user={user}
        showLike={showLike}
        showComment={showComment}
        index={index}
        setIndex={setIndex}
      />
    );
  } else if (_post.data.post_type == "text") {
    return (
      <PostV2
        data={_post.data}
        user={user}
        navigation={navigation}
        showLike={showLike}
        showComment={showComment}
        index={index}
        setIndex={setIndex}
      />
    );
  } else if (_post.data.post_type == "tiktok") {
    return (
      <TiktokPost
        data={_post.data}
        user={user}
        navigation={navigation}
        showLike={showLike}
        showComment={showComment}
        index={index}
        setIndex={setIndex}
      />
    );
  } else if (_post.data.post_type == "instagram") {
    // return <></>;
    return (
      <InstagramPost
        data={_post.data}
        user={user}
        navigation={navigation}
        showLike={showLike}
        showComment={showComment}
        index={index}
        setIndex={setIndex}
      />
    );
  }
  return (
    <YoutubePost
      data={_post.data}
      user={user}
      navigation={navigation}
      showLike={showLike}
      showComment={showComment}
      index={index}
      setIndex={setIndex}
    />
  );
  return <></>;
};

export default React.memo(PostContainer);
