import { grapevineBackend } from "../ci.axios";

export const getFeaturedUser = async (page = 1, limit = 5, filter = {}) => {
  let filter_data = { ...filter };
  if (filter.intrests !== undefined) {
    filter_data.intrests = { hasSome: [filter.intrests] };
  }
  const data = await grapevineBackend(
    `/user/getFeatured?page=${page}&limit=${limit}`,
    filter_data,
    "POST"
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
