import { useMutation, useQueryClient } from "react-query";
import { changeProfileImage } from "../../API/User/changeProfileImage";
import Toast from "react-native-root-toast";

const ChangeProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation(changeProfileImage, {
    onSuccess: async (response) => {
      Toast.show("Successfully Changed Profile", {
        duration: Toast.durations.LONG,
      });
      queryClient.invalidateQueries("LoginUserInfo");
    },
    onError: async (error) => {
      Toast.show(error.message, {
        duration: Toast.durations.LONG,
      });
    },
  });
};
export default ChangeProfileImage;
