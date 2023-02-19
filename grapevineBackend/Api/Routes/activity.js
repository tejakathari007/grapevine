const express = require("express");
const router = express.Router();
const { activities } = require("@services");
const {
  middleware: { asyncWrapper },
} = require("@utils");
router.post("/get/foryou", (req, res) =>
  asyncWrapper(
    activities.getForYou(req.user_uuid, req.query.page, req.query.limit),
    res
  )
);
router.post("/get/connected", async (req, res) =>
  asyncWrapper(
    activities.getConnected(req.user_uuid, req.query.page, req.query.limit),
    res
  )
);
router.post("/get/myActivity", async (req, res) => {
  console.log(req.body);
  asyncWrapper(
    activities.getUserActivity(
      req.body.user_uuid,
      req.query.page,
      req.query.limit
    ),
    res
  );
});

module.exports = router;
