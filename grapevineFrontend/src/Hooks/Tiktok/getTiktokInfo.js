import { useMutation, useQueryClient } from "react-query";
import Toast from "react-native-root-toast";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
const GetTiktokInfo = () => {
  const queryClient = useQueryClient();

  const tiktokLogin = async (onSuccess) => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        `https://admin.grapevine-app.co/tiktok/login?redirect=${Linking.createURL(
          ""
        )}`,
        Linking.createURL("")
      );
      if (result.url) {
        const data = Linking.parse(result.url);
        const response = await onSuccess(data.queryParams);
        queryClient.invalidateQueries("LoginUserInfo");
      }
    } catch (err) {
      Toast.show("Something Went Wrong", {
        duration: Toast.durations.SHORT,
      });
      console.log(err, "netwotk container");
    }
  };

  return { tiktokLogin };
};
export default GetTiktokInfo;
