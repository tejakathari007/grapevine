import { TextArea, Text, Box, Pressable, Flex } from "native-base";
import React, { useState, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import PostHeader from "../../MoleculeComponents/Post/PostComponents/PostHeader";
import { UserValue } from "../../Context/UserContext";
import Toast from "react-native-root-toast";
import {
  MolecularComponents,
  Layout,
  PageComponent,
} from "../../Exports/index";
import { BackLayout } from "../../Layout";
import { MaterialIcons } from "@expo/vector-icons";
import SharePost from "../../Hooks/Posts/sharePost";

const Share_Post = ({ navigation, route }) => {
  const { PostContainer } = MolecularComponents;
  const {
    Post_Instagram_Tiktok: { SelectOptions },
  } = PageComponent;
  const share = SharePost();
  const { SignInLayout } = Layout;
  const [option, setOption] = useState(null);
  const { post_uuid } = route.params;
  const [user, setUser] = useContext(UserValue);
  const [caption, setCaption] = useState("");
  const [products, setProducts] = useState([]);
  const [persons, setPersons] = useState([]);

  const sharePost = () => {
    Toast.show("Sharing", {
      duration: Toast.durations.LONG,
    });
    let data = {
      post_uuid: post_uuid,
      user_uuid: user.uuid,
      username: user.username,
      keys: user.intrests,
      post: caption,
      products: products,
    };
    setCaption("");
    share.mutate(data);
  };

  return (
    <BackLayout
      navigation={navigation}
      color="black"
      safeArea
      showBackIcon={option ? false : true}
    >
      <Box h="100%" w="100%" bg="#fff" mb={5}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          position="relative"
          pb="5"
          borderBottomWidth="1"
          borderBottomColor="gray.200"
        >
          <Box>
            <Text fontFamily="bold" textAlign="center">
              Share Post
            </Text>
          </Box>
          {!option && (
            <Pressable onPress={sharePost} position="absolute" right="5">
              <Box px="5" py="1" borderRadius="md" bg="primary">
                <Text fontFamily="bold" color="white">
                  Share
                </Text>
              </Box>
            </Pressable>
          )}
        </Box>
        <SelectOptions
          option={option}
          close={() => setOption(null)}
          products={products}
          setProducts={setProducts}
          persons={persons}
          setPersons={setPersons}
        />
        <SignInLayout>
          <Box p="2" flexDirection="row" mb="2">
            <Box px="2" flex="1" ml="5">
              <Box display="flex" justifyContent="center" mb="2">
                <Text fontSize={14} fontFamily="bold">
                  Caption
                </Text>
                <Box w="10" h="1" bg="primary" ml="2" borderRadius="full"></Box>
              </Box>

              <TextArea
                placeholder="Write a Caption..."
                w="100%"
                h={10}
                fontFamily="light"
                bg="gray.100"
                borderWidth="1"
                _focus={{
                  bg: "gray.100",
                }}
                onChangeText={(text) => setCaption(text)}
                value={caption}
              />
            </Box>
          </Box>

          <Flex p={3} direction="row" justifyContent="space-between">
            <Text fontWeight={"800"} fontSize={16} fontFamily="light">
              Preview
            </Text>
          </Flex>

          <Box display="flex" justifyContent={"center"} alignItems="center">
            <Box w="70%" alignItems="center" borderRadius="10" bg="white">
              <PostHeader username={user.username} type="tiktok" />

              <Box w="100%" mt="5">
                <PostContainer
                  post={{ uuid: post_uuid }}
                  user={user}
                  navigation={navigation}
                  showComment={false}
                />
              </Box>
            </Box>
          </Box>

          <Pressable onPress={sharePost} alignItems="center" mb="10" mt="5">
            <Box
              bg="primary"
              p="1"
              pr="3"
              pl="3"
              w="80%"
              borderRadius={"md"}
              alignItems="center"
              _text={{
                fontFamily: "bold",
                color: "white",
              }}
            >
              Share
            </Box>
          </Pressable>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default Share_Post;
