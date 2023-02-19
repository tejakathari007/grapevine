import { getCreatorUser } from "../../API/User/getAllCreator";
import { useQuery } from "react-query";
const GetCreatorUser = ({ page, limit, filter }) => {
  return useQuery("fetchCreatorUsers", () =>
    getCreatorUser(page, limit, filter)
  );
};
export default GetCreatorUser;
