import React, { useState } from "react";
import { PostContainer } from "../../MoleculeComponents/index";
import { RefreshControl } from "react-native";
import { Center, Box, ScrollView, Image, Text, Spinner } from "native-base";

const ForYouPost = ({ user, navigation, forYouPosts }) => {
  const [refreshState, setRefreshState] = useState(false);

  const onScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      forYouPosts.fetchNextPage();
    }
  };
  if (forYouPosts.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }
  if (!forYouPosts.data?.pages[0]?.result.length > 0 || forYouPosts.isError) {
    return (
      <Center h="100%" w="100%">
        <Image
          source={require("../../../assets/Logo/Logo.png")}
          size={100}
          resizeMode="contain"
          p="5"
          alt="Image"
        />
        <Text
          fontSize="16"
          fontWidth="800"
          color="primary"
          mt="10"
          fontFamily="bold"
        >
          Sorry, no posts yet.
        </Text>
      </Center>
    );
  }
  return (
    <Box pb="81">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshState}
            onRefresh={() => {
              setRefreshState(true);
              setTimeout(() => {
                setRefreshState(false);
              }, 3000);
            }}
          />
        }
        h="100%"
        onScroll={({ nativeEvent }) => {
          onScroll(nativeEvent);
        }}
        mb="16"
      >
        {forYouPosts.data?.pages.map((page) =>
          page.result.map((post, index) => {
            return (
              <Box mt={index === 0 ? "0" : "0"} key={post.uuid}>
                <PostContainer
                  post={post}
                  user={user}
                  navigation={navigation}
                />
              </Box>
            );
          })
        )}
      </ScrollView>
    </Box>
  );

  return (
    <>
      {forYouPosts.length === 0 ? (
        <Center h="100%" w="100%">
          <Image
            source={require("../../../assets/Logo/Logo.png")}
            size={100}
            resizeMode="contain"
            p="5"
            alt="Image"
          />
          <Text fontSize="16" fontWidth="800" color="primary" mt="10">
            Sorry, no posts yet.
          </Text>
        </Center>
      ) : (
        <Box pb="70" h="100%">
          <ScrollView
            h="100%"
            onScroll={({ nativeEvent }) => {
              onScroll(nativeEvent);
            }}
          >
            {forYouPosts.map((post, index) => {
              return (
                <Box mt={index === 0 ? "0" : "0"} key={post.uuid}>
                  <PostContainer
                    post={post}
                    user={user}
                    navigation={navigation}
                  />
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      )}
    </>
  );
};

export default ForYouPost;
