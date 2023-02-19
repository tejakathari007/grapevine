import React from "react";
import { Text, View } from "native-base";
import GetPost from "../../../Hooks/Posts/getPost";
import Tiktokvideo from "../../../AtomComponents/TiktokWebview/Tiktokvideo";

const Photo = ({ post }) => {
  const _post = GetPost(post.uuid);
  if (_post.isLoading) {
    return <></>;
  }

  if (_post.isError || !_post.data) {
    return <Text>error</Text>;
  }

  if (_post.data.video_url) {
    return (
      <View w="50%" p={2}>
        <Tiktokvideo uri={_post.data.video_url} />
      </View>
    );
  }
  return <></>;
};

export default Photo;
