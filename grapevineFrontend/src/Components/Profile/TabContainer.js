import React from "react";
import { Box, Pressable } from "native-base";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import {
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Activity from "./Activity";
import PhotoContainer from "./Photos/PhotosContainer";
import PostContainer_Profile from "./PostContainer";

const TabContainer = ({ tiktokPost, posts, user, activities, navigation }) => {
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
    {
      key: "third",
      title: "third",
    },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <PhotoContainer posts={posts} />;
      case "second":
        return <PostContainer_Profile posts={posts} user={user} />;
      case "third":
        return (
          <Activity
            user={user}
            activities={activities}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  const selectIcon = (key) => {
    switch (key) {
      case "first":
        return <MaterialCommunityIcons name="grid" size={16} color="black" />;
        break;
      case "second":
        return <SimpleLineIcons name="pencil" size={16} color="black" />;
        break;
      case "third":
        return <Ionicons name="person-outline" size={16} color="black" />;
    }
    return;
  };

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const borderColor =
            index === i ? "buttonPrimaryColor" : "transparent";
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={i}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                {selectIcon(route.key)}
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box w="100%" h="100%">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height }}
        renderTabBar={renderTabBar}
        style={{ minHeight: layout.height }}
      />
    </Box>
  );
};

export default TabContainer;
