import React, { useState, useEffect } from "react";
export const UserValue = React.createContext(null);
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = (props) => {
  const [user, setUser] = useState({
    data: false,
  });
  useEffect(() => {
    const getUser = async () => {
      var temp = { data: true };
      try {
        const loggedUser = JSON.parse(await AsyncStorage.getItem("user"));
        if (loggedUser) {
          temp = { ...temp, ...loggedUser };
          if (!temp.username) {
            temp.username = temp.brand_name;
          }
          console.log(temp.brand_name, "username");
        }
      } catch (err) {
        console.log(err, "error");
      }
      setUser({ ...temp });
    };
    getUser();
  }, []);

  return (
    <UserValue.Provider value={[user, setUser]}>
      {props.children}
    </UserValue.Provider>
  );
};

export default UserContext;
