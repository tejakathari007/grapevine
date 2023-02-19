import { useMutation, useQueryClient } from "react-query";
import { likePost } from "../../API/Like/likePost";

const LikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["fetchPost", response.post_uuid]);
    },
  });
};
export default LikePost;
