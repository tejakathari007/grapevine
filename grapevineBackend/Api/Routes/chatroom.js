const express = require("express");
const router = express.Router();

const { chats, chatrooms } = require("@services");
const {
  middleware: { asyncWrapper },
} = require("@utils");
const { users } = require("../../Services");
router.post("/create", (req, res) => {
  asyncWrapper(
    chatrooms.create({
      users: [...req.body.users, { uuid: req.user_uuid }],
      name: req.body.name,
    }),
    res
  );
});

module.exports = router;
