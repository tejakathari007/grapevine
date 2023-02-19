import { useMutation, useQueryClient } from "react-query";
import { ignoreFriendRequest } from "../../API/FriendRequest/ignoreFriendRequest";
import { useNavigation } from "@react-navigation/native";

const Ignorefriendrequest = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(ignoreFriendRequest, {
    onSuccess: async (response) => {},
  });
};
export default Ignorefriendrequest;
