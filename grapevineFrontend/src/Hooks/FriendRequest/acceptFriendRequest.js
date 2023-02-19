import { useMutation, useQueryClient } from "react-query";
import { acceptFriendRequest } from "../../API/FriendRequest/acceptFriendRequest";
import { useNavigation } from "@react-navigation/native";

const Acceptfriendrequest = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(acceptFriendRequest, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["User", response.user_request]);
      queryClient.invalidateQueries(["Partial_User", response.user_request]);
    },
  });
};
export default Acceptfriendrequest;
