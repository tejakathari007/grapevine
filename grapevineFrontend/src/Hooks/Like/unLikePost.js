import { useMutation, useQueryClient } from "react-query";
import { unLikePost } from "../../API/Like/unlikePost";

const UnLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(unLikePost, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["fetchPost", response.post_uuid]);
    },
  });
};
export default UnLikePost;
