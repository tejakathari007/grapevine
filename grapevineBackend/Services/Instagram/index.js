const fetch = require("node-fetch");
const qs = require("qs");
const { user, friendship, chatroom, notification } = require("@subscriptions");

const fetchToken = async (code) => {
  let url_access_token = "https://api.instagram.com/oauth/access_token";
  const result = await fetch(url_access_token, {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: qs.stringify({
      client_id: process.env.INSTAGRAM_APP_ID,
      client_secret: process.env.INSTAGRAM_SECRET,
      grant_type: "authorization_code",
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URL,
      code: code,
    }),
  })
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

const fetchLongLivedAccessToken = async (access_token) => {
  let url_access_token = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_SECRET}&access_token=${access_token}`;
  const result = await fetch(url_access_token, {
    method: "GET",
  }).then((res) => res.json());
  return result;
};

const fetchMedias = async (access_token) => {
  return await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption&access_token=${access_token}`
  ).then((data) => data.json());
};

const fetchMediaInformation = async (access_token, post_id) => {
  return await fetch(
    ` https://graph.instagram.com/${post_id}?fields=caption,media_type,id,media_url,permalink,thumbnail_url,timestamp,username&access_token=${access_token}`
  )
    .then((data) => data.json())
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const refetchLongLivedAccessToken = async (expired_token) => {
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${expired_token}`;
  const response = await fetch(url).then((data) => data.json());
  if (response.error) throw Error("Something Went Wrong");
  return response.access_token;
};

const getUserMedias = async (user_uuid) => {
  const _user = await user.getUnique({ where: { uuid: user_uuid } });
  if (_user.instagram_token.length <= 1) {
    return [];
  }
  const medias = await fetchMedias(_user.instagram_token);
  if (medias.error && medias.error.code == 190) {
    // token expired , refetch token
    const new_token = await refetchLongLivedAccessToken(_user.instagram_token);
    const updated_user = await user.update({
      where: { uuid: _user.uuid },
      data: { instagram_token: new_token },
    });
    return await getUserMedias(updated_user.uuid);
  }
  let medialDetails = [];
  if (medias.data) {
    medialDetails = Promise.all(
      medias.data.map(async (media) => {
        return await fetchMediaInformation(_user.instagram_token, media.id);
      })
    );
  }

  return medialDetails;
};

const connect = async (user_uuid, body) => {
  console.log(user_uuid, body, "body");
  const _user = await user.update({
    where: {
      uuid: user_uuid,
    },
    data: {
      instagram_token: body.instagram_token,
    },
  });
  return _user;
};
module.exports = {
  fetchToken,
  fetchMedias,
  fetchMediaInformation,
  getUserMedias,
  connect,
  fetchLongLivedAccessToken,
};
