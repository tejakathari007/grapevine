import { grapevineBackend } from "../ci.axios";

export const uploadPost = async (post) => {
  const data = await grapevineBackend("/post/create", post, "POST", {
    "Content-Type": "multipart/form-data ",
  })
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
