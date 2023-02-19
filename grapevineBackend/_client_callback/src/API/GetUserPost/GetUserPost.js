import { grapevineBackend } from "../ci.axios";

export const GetUserPost = async (uuid) => {

  return await grapevineBackend("/post/userposts", { uuid: uuid }, "POST").then(
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
