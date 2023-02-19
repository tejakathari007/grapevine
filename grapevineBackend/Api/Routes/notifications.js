const express = require("express");
const router = express.Router();
const {
  middleware: { asyncWrapper },
} = require("@utils");
const { notifications } = require("@services");

router.post("/get", async (req, res) =>
  asyncWrapper(
    notifications.get(req.user_uuid, req.query.page, req.query.limit),
    res
  )
);

module.exports = router;
