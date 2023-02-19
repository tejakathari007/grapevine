import { grapevineBackend } from "../ci.axios";
export const connectAccount = async ({
  token,
  refresh_token,
  tiktok_open_id,
}) => {
  return await grapevineBackend(
    "/tiktok/connect",
    {
      tiktokToken: token,
      tiktok_open_id: tiktok_open_id,
      tiktok_refresh: refresh_token,
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
