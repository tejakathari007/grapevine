import { useQueryClient } from "react-query";
import Toast from "react-native-root-toast";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { getToken } from "../../API/Google/getToken";
import { getUserInfo } from "../../API/Google/getUserInfo";
import ValidateEmail from "../Auth/isEmailValid";
import { getYoutubeVideos } from "../../API/Google/getYoutubeVideos";
const GetInstagramInfo = () => {
  const queryClient = useQueryClient();
  const validate = ValidateEmail(
    (data) => {},
    (err) => {
      Toast.show(err.message, {
        duration: Toast.durations.SHORT,
      });
    }
  );

  const InstagramLogin = async (onSuccess) => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        `https://admin.grapevine-app.co/instagram/login?redirect=${Linking.createURL(
          ""
        )}`,

        Linking.createURL("")
      );
      if (result.url) {
        const data = Linking.parse(result.url);
        const token = JSON.parse(data.queryParams.token);
        if (token.access_token) {
          console.log(token, "instagram token");
          await onSuccess(token.access_token);
        }
        queryClient.invalidateQueries("LoginUserInfo");
      }
    } catch (err) {
      Toast.show(err.message, {
        duration: Toast.durations.SHORT,
      });
    }
  };

  return InstagramLogin;
};
export default GetInstagramInfo;
