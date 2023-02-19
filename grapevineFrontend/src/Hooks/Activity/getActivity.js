import { useInfiniteQuery } from "react-query";
import { getConnectedActivity } from "../../API/Activity/getConnectedActivity";
import { getForYouActivity } from "../../API/Activity/getForYouActivity";

const GetActivity = () => {
  const forYouActivities = useInfiniteQuery(
    "getForYouActivity",
    getForYouActivity,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return lastPage.next.page;
        }
      },
    }
  );
  const connectedActivities = useInfiniteQuery(
    "getConnectedActivity",
    getConnectedActivity,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return lastPage.next.page;
        }
      },
    }
  );

  return { forYouActivities, connectedActivities };
};

export default GetActivity;
