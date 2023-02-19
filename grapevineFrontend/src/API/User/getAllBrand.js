import { grapevineBackend } from "../ci.axios";
export const getBrandUsers = async (page = 1, limit = 5, search = "") => {
  const data = await grapevineBackend(
    `/user/getBrands?page=${page}&limit=${limit}&search=${search}`,
    {},
    "GET"
  )
    .then(async ({ data }) => {
      if (data.status) {
        return data.data.result;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
};
