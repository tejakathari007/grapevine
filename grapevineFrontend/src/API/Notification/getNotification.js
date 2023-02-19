import { grapevineBackend } from "../ci.axios";

export const getNotification = async () => {
  const data = await grapevineBackend("/notification/get", {}, "POST").then(
    async ({ data }) => {
      if (data.code == 200) {
        return data.data;
      } else {
        throw new Error("Something Went Wrong");
      }
    }
  );

  return data;
};
