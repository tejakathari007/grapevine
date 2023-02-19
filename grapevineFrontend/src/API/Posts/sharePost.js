import { grapevineBackend } from "../ci.axios";

export const sharePost = async (post) => {
  const data = await grapevineBackend("/post/share", post, "POST")
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err, "error");
      throw new Error(err.message);
    });
  return data;
};
