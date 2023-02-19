const fetch = require("node-fetch");
const { user, friendship, chatroom, notification } = require("@subscriptions");

const fetchToken = async (code) => {
  let url_access_token = "https://oauth2.googleapis.com/token";
  url_access_token += "?client_id=" + process.env.GOOGLE_APP_ID;
  url_access_token += "&client_secret=" + process.env.GOOGLE_APP_SECRET;
  url_access_token += "&code=" + code;
  url_access_token += "&grant_type=authorization_code";
  url_access_token += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`;
  const result = await fetch(url_access_token, { method: "post" })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.access_token) {
        return data;
      } else {
        throw Error("No Access Token");
      }
    })
    .catch((err) => {
      throw Error(err.message);
    });
  return result;
};

const fetchUserVideos = async (access_token, page_token = " ", limit = 25) => {
  return await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?forMine=true&pageToken=${page_token}&maxResults=${limit}&type=video&key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
    .then((data) => data.json())
    .catch((err) => {
      console.log(err);
      console.log("ERROR", err);
    });
};

const fetchAccessTokenFromRefresh = async (refresh_token) => {
  let url_access_token = "https://oauth2.googleapis.com/token";
  url_access_token += "?client_id=" + process.env.GOOGLE_APP_ID;
  url_access_token += "&client_secret=" + process.env.GOOGLE_APP_SECRET;
  url_access_token += "&refresh_token=" + refresh_token;
  url_access_token += "&grant_type=refresh_token";
  // url_access_token += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`;
  const result = await fetch(url_access_token, { method: "post" })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.access_token) {
        return data;
      } else {
        throw Error("No Access Token");
      }
    })
    .catch((err) => {
      throw Error(err.message);
    });
  return result;
};

const connect = async (user_uuid, body) => {
  const _user = await user.update({
    where: {
      uuid: user_uuid,
    },
    data: {
      google_token: body.google_token,
      google_refresh_token: body.google_refresh_token,
    },
  });
  return _user;
};
module.exports = {
  fetchToken,
  fetchUserVideos,
  fetchAccessTokenFromRefresh,
  connect,
};
