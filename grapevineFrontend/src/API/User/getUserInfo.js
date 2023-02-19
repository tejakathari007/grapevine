import { grapevineBackend } from "../ci.axios";

export const getuserInfo = async (uuid) => {
  return await grapevineBackend(`/auth/getuserInfo/${uuid}`, {}, "POST")
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
