import { grapevineBackend } from "../ci.axios";

export const ignoreFriendRequest = async ({ friendship_uuid, user_accept }) => {
  const data = grapevineBackend(
    "/friendship/ignorefriendrequest",
    { friendship_uuid: friendship_uuid, user_accept: user_accept },
    "POST"
  )
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something Went Wrong");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
};
