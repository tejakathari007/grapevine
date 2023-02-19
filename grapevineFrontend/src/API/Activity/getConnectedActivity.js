import { grapevineBackend } from "../ci.axios";

export const getConnectedActivity = async () => {
  const data = await grapevineBackend(
    "/activity/get/connected",
    {},
    "POST"
  ).then(async ({ data }) => {
    if (data.status == true) {
      return data.data;
    } else {
      throw new Error("Something went wrong");
    }
  });

  return data;
};
