export const getUserInfo = async (access_token) => {
  const info = await fetch(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
    {
      method: "GET",
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return info;
};
