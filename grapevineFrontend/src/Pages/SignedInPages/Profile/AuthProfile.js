import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { UserValue } from "../../../Context/UserContext";
import OwnProfile from "./OwnProfile";
import OtherProfile from "./OtherProfile";

const AuthProfile = ({ navigation, route }) => {
  const [user, setUser] = useContext(UserValue);
  const {
    params: { user_uuid },
  } = route;
  if (user.uuid == user_uuid) {
    navigation.navigate("Profile");
  }
  return <OtherProfile user_uuid={user_uuid} navigation={navigation} />;
};

export default AuthProfile;
