const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const { searchHistories } = require("@services");

router.post("/create", (req, res) =>
  asyncWrapper(
    searchHistories.create(
      req.user_uuid,
      req.body.username,
      req.body.search_user_uuid
    ),
    res
  )
);
router.post("/get", (req, res) =>
  asyncWrapper(
    searchHistories.getUserHistory(
      req.user_uuid,
      req.query.page,
      req.query.limit
    ),
    res
  )
);
module.exports = router;
