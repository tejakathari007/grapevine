import { useInfiniteQuery } from "react-query";
import { getAllChatroom } from "../../API/Chatroom/getAllChatroom";
const GetAllChatroom = (search) => {
  const chatrooms = useInfiniteQuery(
    ["getAllChatroom", search],
    (e) => getAllChatroom(e, search),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return lastPage.next.page;
        }
      },
    }
  );
  return chatrooms;
};

export default GetAllChatroom;
