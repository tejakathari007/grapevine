import { grapevineBackend } from "../ci.axios";

export const GetAllPosts = async () => {

  return await grapevineBackend("/post/all", { }, "POST").then(
    ({ data }) => {
      if (data.status) {
        if (!data.data) {
          throw Error("no data");
        }
        return data.data;
      } else {
        throw Error(data.message);
      }
    }
  );
};
