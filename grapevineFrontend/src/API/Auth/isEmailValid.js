import { grapevineBackend } from "../ci.axios";

export const isEmailValid = async ({ email }) => {
  const data = await grapevineBackend(
    "/auth/emailIsValid",
    {
      email: email.toLowerCase(),
    },
    "POST"
  )
    .then(async ({ data }) => {
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
};
