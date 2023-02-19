import { grapevineBackend } from "../ci.axios";

export const isNumberValid = async ({ number }) => {
  console.log(number, "number");
  const data = await grapevineBackend(
    "/auth/numberIsValid",
    {
      number: number.toLowerCase(),
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
