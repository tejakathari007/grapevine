import { getBrandUsers } from "../../API/User/getAllBrand";
import { useQuery } from "react-query";
const GetBrandUser = (page = 1, limit = 5, search = "") => {
  return useQuery(["fetchBrandUsers", search], () =>
    getBrandUsers(page, limit, search)
  );
};
export default GetBrandUser;
