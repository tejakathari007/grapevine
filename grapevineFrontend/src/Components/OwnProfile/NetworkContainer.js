import React, { useState } from "react";
import { Text, Box, Link } from "native-base";
import { RegularImage } from "../../AtomComponents/index";
import { Pressable } from "react-native";
import Toast from "react-native-root-toast";

import GetTiktokInfo from "../../Hooks/Tiktok/getTiktokInfo";
import { connectAccount as connectTiktokAccount } from "../../API/Tiktok/connectAccount";
import { connectAccount as connectInstagramAccount } from "../../API/Instagram/connectAccount";
import { connectAccount as connectGoogleAccount } from "../../API/Google/connectAccount";
import GetInstagramInfo from "../../Hooks/Instagram/getInstagramInfo";
import GetGoogleInfo from "../../Hooks/Google/getGoogleInfo";

const NetworkContainer = ({ setShowTiktokModal, user }) => {
  const { tiktokLogin } = GetTiktokInfo();
  const InstagramLogin = GetInstagramInfo();
  const googleLogin = GetGoogleInfo();

  return (
    <Box>
      <Text textAlign="center" fontFamily="light ">
        {`Your Network`}
      </Text>
      <Box flex="1" flexDir="row" justifyContent="center">
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Logo/logo(1).png")}
        />

        {user.instagram_token ? (
          <Pressable
            onPress={() => {
              Toast.show("Already Connected", {
                duration: Toast.durations.SHORT,
              });
            }}
          >
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/instagram_color.png")}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => InstagramLogin(connectInstagramAccount)}>
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/instagram_color.png")}
            />
          </Pressable>
        )}

        {user.tiktok ? (
          <Pressable
            onPress={() => {
              Toast.show("Already Connected", {
                duration: Toast.durations.SHORT,
              });
            }}
          >
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/TikTok.png")}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => tiktokLogin(connectTiktokAccount)}>
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/TikTok.png")}
            />
          </Pressable>
        )}

        {user.google_token ? (
          <Pressable
            onPress={() => {
              Toast.show("Already Connected", {
                duration: Toast.durations.SHORT,
              });
            }}
          >
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/youtube_color.png")}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => googleLogin(connectGoogleAccount, false)}>
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/youtube_color.png")}
            />
          </Pressable>
        )}
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;
