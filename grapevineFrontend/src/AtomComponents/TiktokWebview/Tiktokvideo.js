import { Center, View, Text } from 'native-base';
import React, { useRef } from 'react';
import WebView from 'react-native-webview';

const Tiktokvideo = ({ uri, h, w, size = 100, buttonSize = 100 }) => {
  const webref = useRef(null);
  const script = `(function(){
    var videoelement = document.querySelectorAll('div.layout-box > * > *')[1];
    var rand = document.querySelectorAll('div')[0];

    window.ReactNativeWebView.postMessage(rand.className);
    var removable = document.querySelector('div.layout-box');
   
    removable.innerHTML = "";
    removable.appendChild(videoelement);
   
    var sideElement = videoelement.querySelectorAll('div')[0].querySelectorAll('div')[1].querySelectorAll('div')[0].querySelectorAll('div')[0];
    
    sideElement.innerHTML = "";

    var border = videoelement.querySelectorAll('div > div')[0];
    border.style.height = "${size || 200}px";

    var videoSize = videoelement.querySelectorAll('div > div')[0];
    videoSize.style.height = "${size || 200}px";
    

    var playButton = videoelement.querySelectorAll('div > svg')[0];
    
    playButton.style.height = "${buttonSize || 100}px";
    playButton.style.width = "${buttonSize || 100}px";
   
  })()`;

  const contentLoaded = () => {
    setTimeout(() => {
      if (webref) webref?.current?.injectJavaScript(script);
    }, 2000);
    return () => {};
  };

  return (
    <View w={w ? w : '100%'} h={h ? h : 200}>
      <WebView
        // ref={webref}
        style={{
          height: '100%',
          width: '100%',
        }}
        onLoadEnd={() => contentLoaded()}
        source={{
          uri: uri,
        }}
        onMessage={(message) => {
          console.log(message.nativeEvent.data, 'message');
        }}
        javaScriptEnabledAndroid={true}
        useWebView2={true}
        cacheEnabled={false}
        useWebkit={true}
        androidLayerType='hardware'
        injectedJavaScript={script}
        // injectedJavaScriptBeforeContentLoaded={script}
        // scrollEnabled={false}
      />
    </View>
  );
};

export default React.memo(Tiktokvideo);
