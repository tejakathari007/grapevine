const { tiktok, user } = require("@subscriptions");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const getAllPosts = () => tiktok.get();

const getUserPosts = async (uuid) => {
  const _user = await user.get({
    where: {
      uuid: uuid,
    },
  });
  return await fetchVideos(_user[0].tiktok, _user[0].tiktok_open_id);
};

const connect = async (
  user_uuid,
  { tiktokToken, tiktok_open_id, tiktok_refresh }
) => {
  return user.update({
    where: {
      uuid: user_uuid,
    },
    data: {
      tiktok_refresh: tiktok_refresh,
      tiktok: tiktokToken,
      tiktok_open_id: tiktok_open_id,
    },
  });
};
const fetchToken = async (code) => {
  const appId = process.env.TIKTOK_APP_ID;
  const appSecret = process.env.TIKTOK_APP_SECRET;
  let url_access_token = "https://open-api.tiktok.com/oauth/access_token/";
  url_access_token += "?client_key=" + appId;
  url_access_token += "&client_secret=" + appSecret;
  url_access_token += "&code=" + code;
  url_access_token += "&grant_type=authorization_code";
  return await fetch(url_access_token, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((token) => {
      if (token.data?.access_token) return token.data;
      return null;
    })
    .catch((err) => {
      throw Error("Invalid Code ");
    });
};

const refetchToken = async (refresh_token) => {
  let CLIENT_KEY = process.env.TIKTOK_APP_ID;
  let url_refresh_token = "https://open-api.tiktok.com/oauth/refresh_token/";
  url_refresh_token += "?client_key=" + CLIENT_KEY;
  url_refresh_token += "&grant_type=refresh_token";
  url_refresh_token += "&refresh_token=" + refresh_token;
  let data = await fetch(url_refresh_token, { method: "post" }).then((res) =>
    res.json()
  );
  return data;
};

const fetchVideos = async (access_token, open_id) => {
  if (access_token && open_id) {
    const video = await fetch("https://open-api.tiktok.com/video/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: access_token,
        open_id: open_id,
        cursor: 0,
        max_count: 10,
        fields: [
          "embed_html",
          "embed_link",
          "like_count",
          "comment_count",
          "share_count",
          "view_count",
          "title",
        ],
      }),
    }).then((data) => data.json());
    const tiktokPost = video?.data?.videos?.map((v) => {
      return {
        embed_link: v.embed_link,
        like_count: v.like_count,
        share_count: v.share_count,
        title: v.title,
        view_count: v.view_count,
      };
    });
    if (tiktokPost) return tiktokPost;
    return [];
  } else {
    return [];
  }
};
const updateTiktokTokenAndPost = async () => {
  const users = await user.get();
  for (let i = 0; i < users.length; i++) {
    if (users[i].tiktok) {
      const data = await refetchToken(users[i].tiktok_refresh);
      user.update({
        where: {
          uuid: users[i].uuid,
        },
        data: {
          tiktok: data.data.access_token,
          tiktok_refresh: data.data.refresh_token,
          tiktok_open_id: data.data.open_id,
        },
      });
    }
  }
};

module.exports = {
  getAllPosts,
  getUserPosts,
  connect,
  fetchToken,
  fetchVideos,
  refetchToken,
  updateTiktokTokenAndPost,
};
