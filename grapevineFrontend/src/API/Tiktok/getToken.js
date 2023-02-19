export const getToken = async (code) => {
  const appId = "awyowg81mowgtks0";
  const appSecret = "426f3d47bb5f6f295fda4f7ded27be5c";
  let url_access_token = "https://open-api.tiktok.com/oauth/access_token/";
  url_access_token += "?client_key=" + appId;
  url_access_token += "&client_secret=" + appSecret;
  url_access_token += "&code=" + code;
  url_access_token += "&grant_type=authorization_code";

  const result = await fetch(url_access_token, { method: "post" })
    .then((res) => res.json())
    .then(async ({ data }) => {
      if (data.access_token) {
        return data;
      } else {
        throw new Error("No Access Token");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return result;
};
