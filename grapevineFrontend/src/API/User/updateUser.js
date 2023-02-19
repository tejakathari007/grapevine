import { grapevineBackend } from "../ci.axios";

export const updateUser = async (info) => {
  return await grapevineBackend("/user/updateUser", info, "POST").then(
    async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something Went Wrong");
      }
    }
  );
};
