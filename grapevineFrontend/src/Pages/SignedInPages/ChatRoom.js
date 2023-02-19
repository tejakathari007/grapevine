import {
  View,
  Text,
  Box,
  Flex,
  ScrollView,
  Input,
  Button,
  Image,
  Pressable,
} from "native-base";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Alert } from "react-native";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import { AtomComponents } from "../../Exports/index";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { io } = require("socket.io-client");
const ChatRoom = ({ navigation, route }) => {
  const { ButtonDark, RegularImage, RoundImage } = AtomComponents;
  const { username, chatroom_uuid, valid_room } = route.params;
  const [message, setMessage] = useState("");
  const [user, setUser] = useContext(UserValue);
  const [messages, setMessages] = useState([]);
  const [valid, setValid] = useState(valid_room);
  const socket = useRef(null);
  const scrollViewref = useRef(null);
  const sendMessage = () => {
    if (message.length > 0) {
      socket.current.emit("messageSent", {
        user_id: user.uuid,
        content: message,
      });
      setMessage("");
    }
  };
  const useGrape = () => {
    grapevineBackend(
      "/grape/use",
      { user_uuid: user.uuid, chatroom_uuid: chatroom_uuid },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setValid(true);
        } else {
          Alert.alert("", data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.current = io(
      `https://admin.grapevine-app.co/?chatRoomid=${chatroom_uuid}`
      // `http://192.168.1.70:4000/?chatRoomid=${chatroom_uuid}`
    );
    grapevineBackend(`/chat/getRoomChats/${chatroom_uuid}`, {}, "POST")
      .then(({ data }) => {
        if (data.status) setMessages([...data.data]);
      })
      .catch((err) => console.log(err));
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.current.on("connection", (socket) => {
      console.log(socket.id);
    });
    socket.current.on("messageReceive", (data) => {
      var temp = messages;
      temp.push(data);
      setMessages([...temp]);
    });
  }, [messages]);

  return (
    <Box h="100%" w="100%" pb={5} bg="#fff">
      <Flex
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        bg="gray.100"
        borderBottomWidth={1}
        borderColor="#d3d3d3"
        px="5"
        py="2"
      >
        <Pressable onPress={() => navigation.pop()}>
          <Image
            alt="image"
            source={require("../../../assets/Icons/back_dark.png")}
            h="8"
            w="8"
            m="2"
          />
        </Pressable>
        <Box>
          <RoundImage
            image={require("../../../assets/Images/1.png")}
            size={9}
          />
          <Text
            color={"primary"}
            fontWeight="800"
            textAlign={"center"}
            fontSize={18}
          >
            {username}
          </Text>
        </Box>
        <RegularImage
          image={require("../../../assets/Icons/Options.png")}
          h={12}
          w={12}
        />
      </Flex>
      {valid ? (
        <>
          <Box w="100%" flex={9}>
            <ScrollView
              ref={scrollViewref}
              onContentSizeChange={() => {
                scrollViewref.current.scrollToEnd({ animated: true });
              }}
            >
              {messages.map((msg) => {
                if (msg.from_user == user.uuid) {
                  return (
                    <Flex
                      key={msg.uuid}
                      direction="row"
                      justifyContent={"flex-end"}
                    >
                      <View
                        key={msg.uuid}
                        bg="#e6e6e6"
                        w="60%"
                        borderRadius={"md"}
                        px={5}
                        py={2}
                        m={1}
                      >
                        <Text color="#000">{msg.content}</Text>
                      </View>
                    </Flex>
                  );
                }
                return (
                  <Flex
                    key={msg.uuid}
                    direction="row"
                    justifyContent={"flex-start"}
                  >
                    <View
                      borderWidth={1}
                      borderColor="#e6e6e6"
                      maxW="70%"
                      borderRadius={"md"}
                      px={5}
                      py={2}
                      m={1}
                    >
                      <Text color="#000">{msg.content}</Text>
                    </View>
                  </Flex>
                );
              })}
            </ScrollView>
          </Box>
          <Box w="100%" h={10}>
            <Flex
              direction="row"
              justifyContent={"space-between"}
              pl="1"
              pr="1"
              h="100%"
            >
              <Input
                borderWidth={0.5}
                width="100%"
                value={message}
                onChangeText={(t) => setMessage(t)}
                h="100%"
                borderRadius={"full"}
                bg="#fff"
                px={10}
                onSubmitEditing={sendMessage}
                placeholder="Message"
                InputRightElement={
                  <MaterialCommunityIcons
                    name="message-reply-outline"
                    size={24}
                    color="black"
                    style={{
                      marginRight: 20,
                    }}
                  />
                }
              />
              {/* <Button w="20%" bg="primary" onPress={sendMessage} h="100%">
                Send
              </Button> */}
            </Flex>
          </Box>
        </>
      ) : (
        <Box h="100%" w="100%" justifyContent={"center"} alignItems="center">
          <Text>You cannot Send Message now</Text>
          <Box w="50%">
            <ButtonDark onPress={useGrape}>Use Grape</ButtonDark>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatRoom;
