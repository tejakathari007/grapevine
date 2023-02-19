import { View, Text, Flex, Pressable, Image, Center, Box } from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import axios from "axios";
import { Alert } from "react-native";

const TiktokLoginModel = ({ show, close, loginSuccess }) => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef(null);
  const redirectUrl = "https://grapevine-app.co/tiktok/call_back";
  const appId = "awyowg81mowgtks0";
  const appSecret = "426f3d47bb5f6f295fda4f7ded27be5c";
  const csrfState = Math.random().toString(36).substring(2);
  let url = "https://www.tiktok.com/auth/authorize/";
  url += `?client_key=${appId}`;
  url += "&scope=user.info.basic,video.list,video.upload";
  url += "&response_type=code";
  url += `&redirect_uri=${redirectUrl}`;
  url += "&state=" + csrfState;
  const getUserInfo = async ({ access_token, open_id }) => {
    const user = await fetch("https://open-api.tiktok.com/user/info/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: access_token,
        open_id: open_id,
        fields: ["open_id", "union_id", "avatar_url"],
      }),
    })
      .then((data) => data.json())
      .catch((err) => err);
  };
  const getUserVideos = async ({ access_token, open_id }) => {
    const video = await fetch("https://open-api.tiktok.com/video/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: access_token,
        open_id: open_id,
        cursor: 0,
        max_count: 10,
        fields: [
          "embed_html",
          "embed_link",
          "like_count",
          "comment_count",
          "share_count",
          "view_count",
          "title",
        ],
      }),
    })
      .then((data) => data.json())
      .catch((err) => err);
    const tiktokPost = video?.data?.videos?.map((v) => {
      return {
        embed_link: v.embed_link,
        like_count: v.like_count,
        share_count: v.share_count,
        title: v.title,
        view_count: v.view_count,
      };
    });
    if (tiktokPost) return tiktokPost;
    return [];
  };

  const getToken = async (code) => {
    // console.log("code", code);
    let url_access_token = "https://open-api.tiktok.com/oauth/access_token/";
    url_access_token += "?client_key=" + appId;
    url_access_token += "&client_secret=" + appSecret;
    url_access_token += "&code=" + code;
    url_access_token += "&grant_type=authorization_code";

    const demo = await fetch(url_access_token, { method: "post" })
      .then((res) => res.json())
      .then(async ({ data }) => {
        if (data.access_token) {
          const posts = await getUserVideos(data);
          return {
            token: data.access_token,
            posts: posts,
            refresh_token: data.refresh_token,
          };
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return demo;
  };

  const changeWebViewstate = async (state) => {
    const { url } = state;
    if (url && url.startsWith(redirectUrl) && key < 1) {
      setKey(key + 1);
      let code = url
        .split(redirectUrl + "?code=")[1]
        .split("&")[0]
        .split("#_")[0];
      if (!code) {
        close();
        return;
      }
      // now fetch token with code
      const data = await getToken(code);
      if (data.token) {
        setKey(0);
        loginSuccess(data);
        close();
      } else {
        setKey(0);
        Alert.alert("", "Error Occured");
        close();
      }
    } else {
      setKey(0);
    }
  };

  if (!show) {
    return <></>;
  }
  return (
    <Center
      h="100%"
      w="100%"
      bg="rgba(0,0,0,0.2)"
      position={"absolute"}
      top={100}
      left={0}
      zIndex={1000}
    >
      <Box
        h="full"
        w="100%"
        bg="#fff"
        borderBottomWidth={2}
        borderBottomColor="gray.300"
      >
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          onNavigationStateChange={changeWebViewstate}
        />
      </Box>

      <Center bg="white" w="100%">
        <Pressable onPress={close}>
          <Text p={5} fontWeight={800} color="red.500">
            Close
          </Text>
        </Pressable>
      </Center>
    </Center>
  );
};

export default TiktokLoginModel;
