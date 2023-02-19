import { useMutation, useQueryClient } from "react-query";
import { sendFriendRequest } from "../../API/FriendRequest/sendFriendRequest";
import { useNavigation } from "@react-navigation/native";

const Sendfriendrequest = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(sendFriendRequest, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["User", response.user_accept]);
      queryClient.invalidateQueries(["Partial_User", response.user_accept]);
    },
  });
};
export default Sendfriendrequest;
