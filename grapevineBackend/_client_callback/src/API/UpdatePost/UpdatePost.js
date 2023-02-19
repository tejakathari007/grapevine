import { grapevineBackend } from "../ci.axios";

export const updatePost = async (value) => {
  return await grapevineBackend("/post/update", value, "POST").then(
    ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw Error(data.message);
      }
    }
  );
};
