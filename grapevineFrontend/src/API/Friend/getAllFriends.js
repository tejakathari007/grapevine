import { grapevineBackend } from "../ci.axios";

export const getAllFriends = async ({ pageParam = 1 }, search) => {
  const data = await grapevineBackend(
    `/friendship/getAllFriends?page=${pageParam}&limit=20&search=${search}`,
    {},
    "POST"
  )
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something Went Wrong");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
};
