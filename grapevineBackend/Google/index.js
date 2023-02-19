const express = require("express");
const router = express.Router();
const path = require("path");
const { tiktoks, users, googles } = require("@services");
router.get("/login", (req, res) => {
  const { redirect } = req.query;
  let url = "https://accounts.google.com/o/oauth2/auth";
  url += `?client_id=${process.env.GOOGLE_APP_ID}`;
  url += "&response_type=code";
  url +=
    "&scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email";
  url += "&access_type=offline";
  url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`;
  url += `&state=${redirect}`;
  res.redirect(url);
});
router.get("/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const token = await googles.fetchToken(code);
    res.redirect(`${state}?token=${JSON.stringify(token)}`);
  } catch (err) {
    res.redirect("/tiktok/call_back/fail");
  }
});

module.exports = router;
