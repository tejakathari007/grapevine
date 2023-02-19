import React from "react";
import { Text, Box } from "native-base";
import { RegularImage } from "../../AtomComponents/index";
const NetworkContainer = ({ user }) => {
  const { fname } = user;
  return (
    <Box>
      <Text textAlign="center" fontWeight="bold" italic>
        {fname}'s Networks
      </Text>
      <Box flex="1" flexDir="row" justifyContent="center">
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Logo/logo(1).png")}
        />
        {user?.instagram && (
          <RegularImage
            h={20}
            w={20}
            image={require("../../../assets/Icons/instagram_color.png")}
          />
        )}
        {user?.tiktok && (
          <RegularImage
            h={20}
            w={20}
            image={require("../../../assets/Icons/TikTok.png")}
          />
        )}
        {user?.youtube && (
          <RegularImage
            h={20}
            w={20}
            image={require("../../../assets/Icons/youtube_color.png")}
          />
        )}
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;
