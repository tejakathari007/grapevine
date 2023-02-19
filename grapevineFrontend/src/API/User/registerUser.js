import { grapevineBackend } from "../ci.axios";

export const registerUser = async (info) => {
  return await grapevineBackend("/auth/register", info, "POST")
    .then(async ({ data }) => {
      if (data.code == 200) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
