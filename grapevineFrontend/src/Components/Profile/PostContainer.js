import React from "react";
import { Text, Box, Center, ScrollView } from "native-base";
import { PostContainer } from "../../MoleculeComponents/index";

const PostContainer_Profile = ({ posts, user }) => {
  return (
    <Center w="100%" bg="theme.bg">
      <Box w="90%" h="100%">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {posts.length > 0 ? (
            <Box pb="70">
              {posts.slice(0, 4).map((d) => {
                return <PostContainer post={d} key={d.uuid} user={user} />;
              })}
            </Box>
          ) : (
            <Center h="100%" w="100%">
              <Text>No Post to show</Text>
            </Center>
          )}
        </ScrollView>
      </Box>
    </Center>
  );
};

export default PostContainer_Profile;
