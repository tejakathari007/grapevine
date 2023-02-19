import { getuserInfo } from "../../API/User/getUserInfo";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserValue } from "../../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetLoginUser = () => {
  const [user, setUser] = useContext(UserValue);
  return useQuery("LoginUserInfo", () => getuserInfo(user.uuid), {
    notifyOnNetworkStatusChange: true,
    onSuccess: async (data) => {
      if (!data) {
        await AsyncStorage.removeItem("user");
        setUser({ ...{ data: true } });
      }
    },
    onError: async () => {
      await AsyncStorage.removeItem("user");
      setUser({ ...{ data: true } });
    },
  });
};
export default GetLoginUser;
