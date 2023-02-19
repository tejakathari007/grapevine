import { useMutation, useQueryClient } from "react-query";
import { uploadPost } from "../../API/Posts/uploadPost";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

const UploadPost = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(uploadPost, {
    onSuccess: async (response) => {
      Toast.show("Success", {
        duration: Toast.durations.SHORT,
      });
      queryClient.setQueryData("fetchForYouPost", (data) => {
        let pages = data.pages;
        pages[0].result.unshift({ ...response, likes: [], comments: [] });
        return {
          pages: pages,
        };
      });
      queryClient.invalidateQueries("fetchForYouPost");
      queryClient.invalidateQueries("LoginUserInfo");

      navigation.navigate("Home");
    },
    onError: () => {
      Toast.show("Something Went Wrong", {
        duration: Toast.durations.SHORT,
      });
    },
  });
};
export default UploadPost;
