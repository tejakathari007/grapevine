import { useMutation, useQueryClient } from "react-query";
import { uploadComment } from "../../API/Comment/uploadComment";
import { useNavigation } from "@react-navigation/native";

const UploadComment = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(uploadComment, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["fetchPost", response.post_uuid]);
    },
  });
};
export default UploadComment;
