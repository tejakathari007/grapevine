import { grapevineBackend } from "../ci.axios";

export const getPost = async (post_uuid) => {
  const data = await grapevineBackend(
    "/post/getPostByUuid",
    { post_uuid: post_uuid },
    "POST"
  )
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
