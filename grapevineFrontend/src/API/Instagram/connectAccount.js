import { grapevineBackend } from "../ci.axios";
export const connectAccount = async (instagram_token) => {
  return await grapevineBackend(
    "/instagram/connect",
    {
      instagram_token: instagram_token,
    },
    "POST"
  )
    .then(({ data }) => {
      if (data.status) {
        return data;
      }
      throw new Error("Something Went Wrong");
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
