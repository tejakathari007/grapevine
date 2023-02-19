const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper, verifyBearerToken },
} = require("@utils");
const {
  likes,
  users,
  posts,
  tiktoks,
  instagrams,
  googles,
} = require("@services");

router.post("/connect", (req, res) => {
  asyncWrapper(googles.connect(req.user_uuid, req.body), res);
});

module.exports = router;
