import {
  View,
  ScrollView,
  Flex,
  Box,
  Pressable,
  HStack,
  Center,
} from "native-base";
import React, { useState, useEffect } from "react";
import { grapevineBackend } from "../../API";
import { YoutubeVideo } from "../../AtomComponents/index";
const YoutubeVideoContainer = ({ onPress, selectedVideo }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    grapevineBackend("/user/getYoutubeVideos", {}, "GET")
      .then(({ data }) => {
        if (data.status) {
          setVideos([...data.data.result]);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView>
      <HStack flexWrap={"wrap"} justifyContent="flex-start">
        {videos.map((video) => {
          return (
            <Pressable key={video.etag} onPress={() => onPress(video)} w="50%">
              <Center position="relative" w="100%">
                <View
                  position={"absolute"}
                  flex={1}
                  width="100%"
                  height={110}
                  bg="gray.100"
                  opacity={selectedVideo?.etag == video.etag ? 0.5 : 0}
                  zIndex={10000}
                ></View>

                <YoutubeVideo
                  video_id={video.id.videoId}
                  height={110}
                  width={"95%"}
                />
              </Center>
            </Pressable>
          );
        })}
      </HStack>
    </ScrollView>
  );
};

export default YoutubeVideoContainer;
