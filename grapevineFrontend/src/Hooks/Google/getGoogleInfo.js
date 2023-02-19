import { useQueryClient } from "react-query";
import Toast from "react-native-root-toast";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { getToken } from "../../API/Google/getToken";
import { getUserInfo } from "../../API/Google/getUserInfo";
import ValidateEmail from "../Auth/isEmailValid";
import { getYoutubeVideos } from "../../API/Google/getYoutubeVideos";
const GetGoogleInfo = () => {
  const queryClient = useQueryClient();
  const validate = ValidateEmail(
    (data) => {},
    (err) => {
      Toast.show(err.message, {
        duration: Toast.durations.SHORT,
      });
    }
  );

  const getInfo = async (token) => {
    console.log(token);
    // const youtube = await getYoutubeVideos(token);
    const user = await getUserInfo(token);
    const isValid = await validate.mutateAsync({ email: user.email });
    if (isValid) return { token: token, email: user.email };
    return null;
  };

  const googleLogin = async (onSuccess, validateUser = true) => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        `https://admin.grapevine-app.co/google/login?redirect=${Linking.createURL(
          ""
        )}`,

        Linking.createURL("")
      );
      if (result.url) {
        const data = Linking.parse(result.url);
        const token = JSON.parse(data.queryParams.token);
        if (validateUser) {
          const user_info = await getInfo(token.access_token);
          if (user_info.token) {
            await onSuccess({
              ...user_info,
              google_refresh_token: token.refresh_token,
            });
          }
        } else {
          await onSuccess({
            token: token.access_token,
            google_refresh_token: token.refresh_token,
          });
        }

        queryClient.invalidateQueries("LoginUserInfo");
      }
    } catch (err) {
      Toast.show(err.message, {
        duration: Toast.durations.SHORT,
      });
    }
  };

  return googleLogin;
};
export default GetGoogleInfo;
