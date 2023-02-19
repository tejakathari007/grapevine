import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { isEmailValid } from "../../API/Auth/isEmailValid";

const ValidateEmail = (success, failure) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(isEmailValid, {
    onSuccess: async (response) => {
      success(response);
      return true;
    },
    onError: async (error) => {
      failure(error);
      return false;
    },
  });
};
export default ValidateEmail;
