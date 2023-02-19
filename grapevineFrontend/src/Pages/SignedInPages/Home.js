import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Text, Flex, Pressable, Image } from "native-base";
import { UserValue } from "../../Context/UserContext";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { ConnectedPosts, ForYouPost } from "../../Components/Home";
import GetPost from "../../Hooks/Posts/getPosts";
import { LinearGradient } from "expo-linear-gradient";

const Home = ({ navigation }) => {
  const [user, setUser] = useContext(UserValue);
  const { forYouPosts, connectedPosts } = GetPost();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "First",
    },
    {
      key: "second",
      title: "second",
    },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ForYouPost
            user={user}
            navigation={navigation}
            forYouPosts={forYouPosts}
          />
        );
      case "second":
        return (
          <ConnectedPosts
            user={user}
            navigation={navigation}
            connectedPosts={connectedPosts}
          />
        );

      default:
        return null;
    }
  };

  const selectIcon = (key) => {
    switch (key) {
      case "first":
        return (
          <Text fontFamily={index === 0 ? "bold" : "light"}>
            For you <Text fontFamily="light"> |</Text>
          </Text>
        );
        break;
      case "second":
        return (
          <Text fontFamily={index === 1 ? "bold" : "light"}>Connected</Text>
        );
        break;
    }
    return;
  };

  const renderTabBar = (props) => {
    return (
      <Box alignItems="center" w="full" bg="white">
        <Box display="flex" flexDirection="row">
          {props.navigationState.routes.map((route, i) => {
            return (
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
                py="5"
                px="1"
                key={i}
              >
                {selectIcon(route.key)}
              </Pressable>
            );
          })}
        </Box>
      </Box>
    );
  };

  // return <Text>hello</Text>;
  return (
    <Box h="100%" w="100%">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(i) => setIndex(i)}
        initialLayout={{ width: layout.width, height: layout.height }}
        renderTabBar={renderTabBar}
        style={{
          minHeight: layout.height,
        }}
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
      />
    </Box>
  );
};

export default Home;
