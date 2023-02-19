import { getAllFriends } from "../../API/Friend/getAllFriends";
import { useInfiniteQuery } from "react-query";
const GetAllFriends = (search) => {
  const friends = useInfiniteQuery(
    ["getFriends", search],
    (e) => getAllFriends(e, search),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return lastPage.next.page;
        }
      },
    }
  );
  return friends;
};
export default GetAllFriends;
