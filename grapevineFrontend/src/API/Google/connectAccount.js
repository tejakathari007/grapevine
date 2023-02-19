import { grapevineBackend } from "../ci.axios";
export const connectAccount = async ({ token, refresh_token }) => {
  return await grapevineBackend(
    "/google/connect",
    {
      google_token: token,
      google_refresh_token: refresh_token,
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
