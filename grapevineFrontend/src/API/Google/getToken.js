export const getToken = async (code) => {
  const appId =
    "745510025866-d4e8b69lc9i3e4gv9dq6th4vijsjvili.apps.googleusercontent.com";
  const appSecret = "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";

  const redirectUrl = "https://admin.grapevine-app.co/google/callback/success";
  let url_access_token = "https://oauth2.googleapis.com/token";
  url_access_token += "?client_id=" + appId;
  url_access_token += "&client_secret=" + appSecret;
  url_access_token += "&code=" + code;
  url_access_token += "&grant_type=authorization_code";
  url_access_token += `&redirect_uri=${redirectUrl}`;
  const result = await fetch(url_access_token, { method: "post" })
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data, "response data");
      if (data.access_token) {
        return data.access_token;
      } else {
        throw new Error("No Access Token");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return result;
};
