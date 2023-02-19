import { getuserInfo } from "../../API/User/getUserInfo";
import { useQuery } from "react-query";
const GetUser = (uuid) => {
  return useQuery(["User", uuid], () => getuserInfo(uuid), {
    notifyOnNetworkStatusChange: true,
  });
};
export default GetUser;
