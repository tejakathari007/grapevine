const express = require("express");
const router = express.Router();
const path = require("path");
const { tiktoks, users } = require("@services");
router.get("/login", (req, res) => {
  const { redirect } = req.query;
  let url = "https://www.tiktok.com/auth/authorize/";
  url += `?client_key=${process.env.TIKTOK_APP_ID}`;
  url += "&scope=user.info.basic,video.list,video.upload";
  url += "&response_type=code";
  url += `&redirect_uri=${process.env.TIKTOK_REDIRECT_URL}`;
  url += "&state=" + redirect;
  res.redirect(url);
});
router.get("/call_back", async (req, res) => {
  try {
    const { code, state } = req.query;
    const token = await tiktoks.fetchToken(code);
    res.redirect(
      `${state}?token=${token.access_token}&refresh_token=${token.refresh_token}&open_id=${token.open_id}`
    );
  } catch (err) {
    res.redirect("/tiktok/call_back/fail");
  }
});
router.get("/call_back/success", (req, res) => {
  res.sendFile(path.join(__dirname, "../_client_callback/build", "index.html"));
});
router.get("/call_back/fail", (req, res) => {
  res.sendFile(path.join(__dirname, "../_client_callback/build", "index.html"));
});

router.get("/call_back/success", (req, res) => {
  res.sendFile(path.join(__dirname, "../_client_callback/build", "index.html"));
});

router.get("/:uuid", (req, res) => {
  res.sendFile(path.join(__dirname, "../_client_callback/build", "index.html"));
});

module.exports = router;
