import { Box, Center, Text } from "native-base";
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
const YoutubeVideo = ({ video_id, height = 160, width = 300 }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <Center height={height} width={width}>
      <YoutubePlayer
        height={"100%"}
        width={"100%"}
        play={playing}
        videoId={video_id}
        position="relative"
      />
    </Center>
  );
};

export default YoutubeVideo;
