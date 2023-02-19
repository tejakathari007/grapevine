import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { createChatroom } from "../../API/Chatroom/createChatroom";

const CreateChatroom = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(createChatroom, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries("getAllChatroom");
      navigation.goBack();
    },
  });
};
export default CreateChatroom;
