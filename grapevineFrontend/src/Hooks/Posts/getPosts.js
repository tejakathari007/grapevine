import { getConnectedPost, getForYouPost } from "../../API/Posts/fetchAllPost";
import { useInfiniteQuery } from "react-query";
const GetPost = () => {
  const forYouPosts = useInfiniteQuery("fetchForYouPost", getForYouPost, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return lastPage.next.page;
      }
    },
  });
  const connectedPosts = useInfiniteQuery(
    "fetchConnectedPost",
    getConnectedPost,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return lastPage.next.page;
        }
      },
    }
  );

  return { forYouPosts, connectedPosts };
};
export default GetPost;
