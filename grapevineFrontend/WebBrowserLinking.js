import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
const WebBrowserLinking = () => {
  const _openAuthSessonAsync = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://admin.grapevine-app.co/tiktok/login?redirect=${Linking.createURL(
        ''
      )}`,
      Linking.createURL('')
    );
    if (result.url) {
      const data = Linking.parse(result.url);
      console.log(data.queryParams.code, 'data');
    }
  };
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        onPress={_openAuthSessonAsync}
        title='Open Website'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      />
      <Text>web</Text>
    </View>
  );
};

export default WebBrowserLinking;
