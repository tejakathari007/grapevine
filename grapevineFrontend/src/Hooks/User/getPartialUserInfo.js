import { getPartialUserInfo } from "../../API/User/getPartialUserInfo";
import { useQuery } from "react-query";
const GetPartialUserInfo = (uuid) => {
  return useQuery(["Partial_User", uuid], () => getPartialUserInfo(uuid));
};
export default GetPartialUserInfo;
