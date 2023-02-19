import { grapevineBackend } from "../ci.axios";

export const updateUser = async (value) => {
  return await grapevineBackend("/user/updateUser", value, "POST").then(
    ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw Error(data.message);
      }
    }
  );
};
