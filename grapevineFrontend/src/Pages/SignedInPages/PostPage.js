import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Box,
  Text,
  Spinner,
  Center,
  Flex,
  TextArea,
  Button,
  ScrollView,
} from "native-base";
import { Keyboard } from "react-native";
import {
  Layout,
  MolecularComponents,
  AtomComponents,
} from "../../Exports/index";
import UploadComment from "../../Hooks/Comment/uploadComment";
import { UserValue } from "../../Context/UserContext";
import GetPost from "../../Hooks/Posts/getPost";
const PostPage = ({ navigation, route }) => {
  const {
    params: { post_uuid },
  } = route;
  const { PostContainer } = MolecularComponents;
  const { RoundImage } = AtomComponents;
  const [user, setUser] = useContext(UserValue);
  const [commentText, setCommentText] = useState("");
  const post = GetPost(post_uuid);
  const { SignInLayout, BackLayout } = Layout;
  const comment = UploadComment();
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  const postComment = () => {
    if (!comment.isLoading && commentText.length > 0) {
      let comment_data = {
        user_uuid: user.uuid,
        post_uuid: post_uuid,
        comment_text: commentText,
      };
      setCommentText("");
      comment.mutate(comment_data);
    }
  };

  if (post.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }
  if (post.isError || !post.data) {
    return (
      <Center h="100%" w="100%">
        <Image
          source={require("../../../assets/Logo/Logo.png")}
          size={100}
          resizeMode="contain"
          p="5"
          alt="Image"
        />
        <Text fontSize="16" fontWidth="800" color="primary" mt="10">
          Sorry, no post yet.
        </Text>
      </Center>
    );
  }

  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box h="full" w="full" bg="white" pb={20}>
        <Text fontWeight="800" fontSize={16} textAlign="center" mb="2">
          Post
        </Text>
        {/* <SignInLayout> */}
        {/* <Box h="100%" w="100%"> */}
        <ScrollView>
          <PostContainer
            post={post.data}
            user={user}
            navigation={navigation}
            showComment={false}
          />
          {/* </Box> */}
          <Box bg="red.600">
            <Text
              textAlign={"center"}
              fontWeight="800"
              fontSize={16}
              position="absolute"
              top={-30}
              width="100%"
            >
              Comments
            </Text>
          </Box>
          <Box>
            {post.data?.comments?.length > 0 ? (
              post.data.comments.map((comment) => {
                return (
                  <Flex
                    direction="row"
                    key={comment.uuid}
                    my="5px"
                    w="full"
                    px="2"
                  >
                    <RoundImage
                      image={require("../../../assets/Images/1.png")}
                      size={30}
                    />
                    <Box ml="2" flex="1" flexDirection="row" pr="5">
                      <Text fontSize="sm" fontWeight="700" fontFamily="bold">
                        {comment.user.username}{" "}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="300"
                        textAlign="left"
                        fontFamily="light"
                      >
                        {comment.comment_text}
                      </Text>
                    </Box>
                  </Flex>
                );
              })
            ) : (
              <Box alignItems="center" m="10" fontFamily="bold">
                No comments yet.
              </Box>
            )}
          </Box>
        </ScrollView>
        {/* </SignInLayout> */}
        <Box
          w="full"
          display="flex"
          flexDirection="row"
          borderTopWidth="1"
          borderColor="gray.200"
          alignItems="center"
          p="2"
          position="absolute"
          bottom={keyboardOffset}
          zIndex={1000}
          bg="white"
        >
          <RoundImage
            boxClass={{
              mr: "1",
              borderColor: "white",
              mt: "5",
            }}
            size="10"
            image={require("../../../assets/Images/1.png")}
          />
          <TextArea
            autoFocus
            fontSize="sm"
            fontWeight="400"
            placeholder={`Add a comment as ${user.username}`}
            color="black"
            borderWidth={1}
            h="auto"
            fontFamily="light"
            flex="1"
            borderColor="gray.400"
            borderRadius="3xl"
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
            _focus={{
              bg: "white",
            }}
            alignItems="center"
            m="2"
            // mt='5'
            InputRightElement={
              <Button
                _text={{
                  color: "primary",
                  fontFamily: "bold",
                }}
                onPress={postComment}
              >
                {comment.isLoading ? (
                  <Spinner accessibilityLabel="Loading" />
                ) : (
                  "Post"
                )}
              </Button>
            }
          />
        </Box>
      </Box>
    </BackLayout>
  );
};

export default PostPage;
