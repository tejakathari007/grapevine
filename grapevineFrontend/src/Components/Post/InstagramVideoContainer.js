import {
  View,
  Text,
  ScrollView,
  Center,
  Box,
  Radio,
  Flex,
  Image,
} from "native-base";
import React, { useEffect, useContext, useState } from "react";
import { Pressable } from "react-native";
import { grapevineBackend } from "../../API";
// import Tiktokvideo from "../../AtomComponents/TiktokWebview/Tiktokvideo";
import { UserValue } from "../../Context/UserContext";
import { Tiktokvideo } from "../../AtomComponents/index";
import { AntDesign } from "@expo/vector-icons";

const InstagramVideoContainer = ({ onPress, selectedMedia }) => {
  const [medias, setMedias] = useState([]);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    grapevineBackend(
      "/post/userInstagramMedia",
      {
        user_uuid: user.uuid,
      },
      "POST"
    )
      .then(({ data }) => {
        console.log(data, "instagram");
        if (data.status) {
          setMedias([...data.data]);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView>
      <Box flex="1" m="2">
        <Flex
          direction="row"
          justifyContent={"flex-start"}
          //   alignItems="center"
          flexWrap={"wrap"}
        >
          {medias.length > 0 ? (
            medias.map((media) => (
              <Box key={media.id} width="50%" p={2}>
                <Pressable
                  onPress={() => {
                    console.log(media);
                    onPress(media);
                  }}
                >
                  <Box position="relative">
                    <Box position="absolute" zIndex={10000} top="2" left="2">
                      <AntDesign
                        name={"checkcircle"}
                        size={24}
                        color={`${
                          selectedMedia?.id !== media.id
                            ? "rgba(121,73,231,0.4)"
                            : "#fff"
                        }`}
                        style={{
                          textShadowOffset: { width: 5, height: 2 },
                          shadowColor: "#000000",
                          shadowOpacity: 0.5,
                        }}
                      />
                    </Box>
                    <Box>
                      <Image
                        alt="Instagram Image"
                        source={{ uri: media.media_url }}
                        h={100}
                      />
                    </Box>
                  </Box>
                </Pressable>
              </Box>
            ))
          ) : (
            <Box h="100%">
              <Text
                color="primary"
                fontWeight={"800"}
                fontSize={20}
                textAlign="center"
                mt={10}
              >
                No Instagram Video
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
    </ScrollView>
  );
};

export default InstagramVideoContainer;
