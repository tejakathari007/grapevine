import { getPost } from "../../API/Posts/fetchPost";
import { useQuery } from "react-query";
const GetPost = (uuid) => {
  return useQuery(["fetchPost", uuid], () => getPost(uuid));
};
export default GetPost;
