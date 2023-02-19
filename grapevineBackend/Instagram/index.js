const express = require("express");
const router = express.Router();
const path = require("path");
const { tiktoks, users, googles, instagrams } = require("@services");

router.get("/login", (req, res) => {
  const { redirect } = req.query;
  let url = "https://api.instagram.com/oauth/authorize";
  url += `?client_id=${process.env.INSTAGRAM_APP_ID}`;
  url += "&response_type=code";
  url += "&scope=user_profile,user_media&response_type=code";
  url += `&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URL}`;
  url += `&state=${redirect}`;
  res.redirect(url);
});
router.get("/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const short_life_token = await instagrams.fetchToken(code);
    const long_life_token = await instagrams.fetchLongLivedAccessToken(
      short_life_token.access_token
    );
    res.redirect(`${state}?token=${JSON.stringify(long_life_token)}`);
  } catch (err) {
    console.log(err);
    res.redirect("/tiktok/call_back/fail");
  }
});

module.exports = router;
