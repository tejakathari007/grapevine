const express = require("express");
const router = express.Router();

const { chats } = require("@services");
const {
  middleware: { asyncWrapper },
} = require("@utils");
router.post("/getRoomChats/:room_id", (req, res) =>
  asyncWrapper(chats.getChats(req.params.room_id), res)
);

module.exports = router;
