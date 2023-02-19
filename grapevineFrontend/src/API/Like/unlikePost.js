import { grapevineBackend } from "../ci.axios";

export const unLikePost = async (likeData) => {
  const data = await grapevineBackend("/likes/dislike", likeData, "POST")
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
