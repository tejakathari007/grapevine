import { grapevineBackend } from "../ci.axios";

export const getAllUsers = async () => {
  return await grapevineBackend("/auth/getallusers", {}, "POST").then(
    ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw Error(data.message);
      }
    }
  );
};
