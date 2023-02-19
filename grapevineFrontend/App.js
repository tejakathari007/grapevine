// import { StyleSheet, Platform, StatusBar } from 'react-native';

import Theme from "./src/Theme/Theme";
import { Context } from "./src/Exports/index";
import { LogBox } from "react-native";
import { QueryClientProvider, QueryClient } from "react-query";
import { useFonts } from "expo-font";
import WebBrowserLinking from "./WebBrowserLinking";

LogBox.ignoreLogs(["ViewPropTypes will be removed"]);

export default function App() {
  const [loaded] = useFonts({
    light: require("./assets/fonts/Gilroy-Light.otf"),
    bold: require("./assets/fonts/Gilroy-ExtraBold.otf"),
  });

  if (!loaded) {
    return null;
  }
  const { ThemeContext, UserContext, ExpoToastContext, PostContext } = Context;
  const queryClient = new QueryClient();
  return (
    <ThemeContext>
      <QueryClientProvider client={queryClient}>
        <UserContext>
          {/* <PostContext> */}
          <ExpoToastContext>
            <Theme />
          </ExpoToastContext>
          {/* </PostContext> */}
        </UserContext>
      </QueryClientProvider>
    </ThemeContext>
  );
  // return <WebBrowserLinking />;
}
