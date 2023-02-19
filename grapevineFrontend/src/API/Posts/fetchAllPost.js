import { grapevineBackend } from "../ci.axios";

export const getForYouPost = async ({ pageParam = 1 }) => {
  const data = await grapevineBackend(
    `/post/forYouPost?page=${pageParam}&limit=4`,
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
      throw new Error("Something Went Wrong");
    });
  return data;
};

export const getConnectedPost = async ({ pageParam = 1 }) => {
  const data = await grapevineBackend(
    `/post/connectedPost?page=${pageParam}&limit=4`,
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
      throw new Error("Something Went Wrong");
    });
  return data;
};
