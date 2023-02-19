import { getFeaturedUser } from "../../API/User/getFeaturedUser";
import { useQuery } from "react-query";
const GetFeaturedUser = ({ page, limit, filter }) => {
  return useQuery(
    ["fetchFeaturedUsers", page, limit],
    () => getFeaturedUser(page, limit, filter),
    {
      notifyOnNetworkStatusChange: true,
    }
  );
};
export default GetFeaturedUser;
