import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const userHook = () => {
  const [userDetails, setUserDetail] = useState(null);

  useEffect(async () => {
    let user = await AsyncStorage.getItem("user");
    if (user) setUserDetail(JSON.parse(user));
  }, []);

  const setUserDetails = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUserDetail(user);
  };
  const hasUser = () => (userDetails ? userDetails : null);

  return {
    userDetails,
    hasUser,
    setUserDetails,
  };
};
