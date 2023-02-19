import {
  View,
  Text,
  Flex,
  Box,
  Input,
  TextArea,
  Button,
  Center,
  Spinner,
  Image,
} from "native-base";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Keyboard } from "react-native";
import { UserValue } from "../../Context/UserContext";
import { AtomComponents, Layout } from "../../Exports/index";
import UploadComment from "../../Hooks/Comment/uploadComment";
import GetPost from "../../Hooks/Posts/getPost";

const { RoundImage } = AtomComponents;
const { SignInLayout, BackLayout } = Layout;

const CommentPage = ({ navigation, route }) => {
  const {
    params: { post_uuid },
  } = route;
  console.log(post_uuid, "post_uuid");
  const post = GetPost(post_uuid);
  const comment = UploadComment();
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useContext(UserValue);

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
  if (post.isError) {
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
          Sorry, no post yet.
        </Text>
      </Center>
    );
  }

  return (
    <BackLayout navigation={navigation} color="black" safeArea>
      <Box h="full" w="full" bg="white">
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          mb="2"
          fontFamily="bold"
        >
          Comments
        </Text>
        <SignInLayout>
          {post.data?.comments?.length > 0 ? (
            post.data.comments.map((comment) => {
              return (
                <Flex
                  direction="row"
                  key={comment.uuid}
                  my="10px"
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
        </SignInLayout>
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

export default CommentPage;
