import { grapevineBackend } from "../ci.axios";

export const sendFriendRequest = async (frined_data) => {
  const data = grapevineBackend(
    "/friendship/sendfriendrequest",
    frined_data,
    "POST"
  )
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
};
