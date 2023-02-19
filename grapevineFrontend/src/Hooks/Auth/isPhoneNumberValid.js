import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { isNumberValid } from "../../API/Auth/isPhoneNumberValid";

const ValidatePhoneNumber = (success, failure) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(isNumberValid, {
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
export default ValidatePhoneNumber;
