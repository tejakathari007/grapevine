import { useInfiniteQuery } from "react-query";
import { getNotification } from "../../API/Notification/getNotification";
const GetNotofication = () => {
  const notification = useInfiniteQuery("getNotification", getNotification, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return lastPage.next.page;
      }
    },
  });
  return notification;
};

export default GetNotofication;
