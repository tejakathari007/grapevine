import { View, Text, Flex, Pressable, Image, Center, Box } from 'native-base';
import React, { useState, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
const qs = require('qs');
const InstagramLoginModel = ({ show, close, loginSuccess, top }) => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef(null);
  const redirectUrl = 'https://github.com/';
  const appId = '1817113448678856';
  const appSecret = '13e787b8903c5a5b4cc84164a37fee00';
  const uri = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`;

  const fetchAdditionalInfo = async (access_token) => {
    console.log(access_token);
    // fetch for the users media, i.e Posts
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption&access_token=${access_token}`
    )
      .then((response) => response.json())
      .then((post) => {
        /*
         post.data is an array of objects that contain post id and post caption 

         post.data=[{id,caption}]
        */
        //  after getting post id, we fetch the total post information
        // console.log("posts", post);
        // fetch(
        //   `https://graph.instagram.com/${post.data[0].id}?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`
        // )
        fetch(
          `https://graph.facebook.com/v11.0/${post.data[0].id}?fields=caption,comments_count,id,ig_id,is_comment_enabled,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username,video_title&access_token=${access_token}`
        )
          .then((p) => p.json())
          .then((p) => {
            // p is an post information
            // console.log("Posts[0] detail", p);
          });
      })
      .catch((err) => {
        console.log('err', err);
      });
    // fetch the user information, ie username
    fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
    )
      .then((response) => response.json())
      .then((d) => {
        // console.log("user_data", d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getToken = async (code) => {
    let res = await axios({
      method: 'post',
      url: 'https://api.instagram.com/oauth/access_token',
      data: qs.stringify({
        client_id: appId,
        client_secret: appSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
        code: code,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(({ data }) => data)
      .catch((err) => {
        console.log('Error instagram', err);
        return false;
      });
    return res.access_token;
  };

  const changeWebViewstate = async (state) => {
    // get url of the the site that is rendered in webview
    const { url } = state;
    // only proceed if url is present , url is redirect url and key <1 (because the function run twice for each redirect: twice when instagram login page renders and twice when redirect url renders )
    if (url && url.startsWith(redirectUrl) && key < 1) {
      setKey(key + 1);
      // refactor the url to get the code only
      let code = url.split(redirectUrl + '?code=')[1].split('#_')[0];
      // now fetch token with code
      const res = await getToken(code);
      if (res) {
        setKey(0);
        fetchAdditionalInfo(res);
        loginSuccess(res);
        close();
      } else {
        setKey(0);
        loginSuccess('Error Occured');
        close();
      }
    } else {
      setKey(0);
    }
  };

  if (!show) {
    return <View></View>;
  }
  return (
    <Center
      h='100%'
      w='100%'
      position='absolute'
      top={100}
      left={0}
      zIndex={1000}
    >
      <Box
        h='full'
        w='100%'
        mb='5'
        bg='white'
        borderBottomWidth={2}
        borderBottomColor='gray.300'
      >
        <WebView
          ref={webViewRef}
          source={{ uri: uri }}
          onNavigationStateChange={changeWebViewstate}
          style={{ height: '50%' }}
        />
        <Center bg='#fff' w='100%'>
          <Pressable onPress={close}>
            <Text p={5} fontWeight={800} color='red.500'>
              Close
            </Text>
          </Pressable>
        </Center>
      </Box>
    </Center>
  );
};

export default InstagramLoginModel;
