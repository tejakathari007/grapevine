import { grapevineBackend } from "../ci.axios";

export const changeProfileImage = async (image) => {
  const data = await grapevineBackend(`/user/changeProfile`, image, "POST", {
    "Content-Type": "multipart/form-data ",
  })
    .then(async ({ data }) => {
      console.log(data, "response");
      if (data.status) {
        return data.data;
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err.message);
      throw new Error(err.message);
    });

  return data;
};
