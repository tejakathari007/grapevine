import { useMutation, useQueryClient } from "react-query";
import { sharePost } from "../../API/Posts/sharePost";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
const SharePost = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation(sharePost, {
    onSuccess: async (response) => {
      Toast.show("Post Shared", {
        duration: Toast.durations.LONG,
      });
      navigation.goBack();
      queryClient.invalidateQueries("fetchForYouPost");
    },
  });
};
export default SharePost;
