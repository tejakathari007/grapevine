import { useMutation, useQueryClient } from "react-query";
import { registerUser } from "../../API/User/registerUser";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Hooks } from "../../Exports";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterUser = () => {
  const { user, setUser } = Hooks.ContextHook();
  const navigation = useNavigation();

  return useMutation(registerUser, {
    onSuccess: async (response) => {
      console.log("response", response);
      Toast.show("Registered Succssfully", {
        duration: Toast.durations.LONG,
      });

      await AsyncStorage.setItem("user", JSON.stringify(response));
      setUser({
        ...response,
        ...user,
      });
    },
    onError: async (error) => {
      Toast.show(error.message, {
        duration: Toast.durations.LONG,
      });
    },
  });
};
export default RegisterUser;
