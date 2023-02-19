import { getFriendRequest } from "../../API/FriendRequest/getFriendRequest";
import { useQuery } from "react-query";
const GetFriendRequest = (uuid) => {
  return useQuery("frinedRequest", () => getFriendRequest(uuid));
};
export default GetFriendRequest;
