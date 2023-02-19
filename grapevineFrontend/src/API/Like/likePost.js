import { grapevineBackend } from "../ci.axios";

export const likePost = async (likeData) => {
  const data = await grapevineBackend("/likes/create", likeData, "POST")
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
};
