import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../API/User/updateUser";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

const UpdateUser = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(updateUser, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries("LoginUserInfo");
      Toast.show("Success", {
        duration: Toast.durations.SHORT,
      });
      navigation.pop();
    },
  });
};
export default UpdateUser;
