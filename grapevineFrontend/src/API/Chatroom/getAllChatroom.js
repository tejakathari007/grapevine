import { grapevineBackend } from "../ci.axios";

export const getAllChatroom = async ({ pageParam = 1 }, search) => {
  const data = await grapevineBackend(
    `/user/getAllChatRoom?page=${pageParam}&limit=20&search=${search}`,
    {},
    "POST"
  ).then(async ({ data }) => {
    if (data.status) {
      return data.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  });

  return data;
};
