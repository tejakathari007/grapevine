import { grapevineBackend } from "../ci.axios";

export const GetUserProfile = async (uuid) => {

  return await grapevineBackend(`/auth/getuserInfo/${uuid}`, {}, "POST").then(
    ({ data }) => {
      if (data.status) {
        if (!data.data) {
          throw Error("no data");
          return;
        }
        return data.data;
      } else {
        throw Error(data.message);
      }
    }
  );
};
