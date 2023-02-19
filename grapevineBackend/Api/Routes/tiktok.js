const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const { likes, users, posts, tiktoks } = require("@services");

router.post("/connect", validateReqestData, (req, res) => {
  asyncWrapper(tiktoks.connect(req.user_uuid, req.body), res);
});

router.post("/update", validateReqestData, (req, res) => {
  // asyncWrapper(tiktoks.connect(req.user_uuid, req.body), res);
  tiktoks.updateTiktokTokenAndPost();
});

module.exports = router;
