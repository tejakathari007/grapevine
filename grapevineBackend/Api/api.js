const express = require("express");
const router = express.Router();
const {
  middleware: { verifyBearerToken },
} = require("@utils");
router.use("/auth", require("./Routes/auth"));
router.use("/post", verifyBearerToken, require("./Routes/post"));
router.use("/likes", verifyBearerToken, require("./Routes/likes"));
router.use("/comment", verifyBearerToken, require("./Routes/comment"));
router.use("/likeComment", verifyBearerToken, require("./Routes/commentLike"));
router.use("/friendship", verifyBearerToken, require("./Routes/firendship"));
router.use("/chat", verifyBearerToken, require("./Routes/chat"));
router.use("/admin", require("./Routes//admin"));
router.use("/user", require("./Routes/user"));
router.use("/chatroom", verifyBearerToken, require("./Routes/chatroom"));
router.use("/common", require("./Routes/common"));

router.use(
  "/notification",
  verifyBearerToken,
  require("./Routes/notifications")
);
router.use("/grape", verifyBearerToken, require("./Routes/grape"));

router.use("/activity", verifyBearerToken, require("./Routes/activity"));
router.use("/history", verifyBearerToken, require("./Routes/history"));
router.use("/tiktok", verifyBearerToken, require("./Routes/tiktok"));
router.use("/instagram", verifyBearerToken, require("./Routes/instagram"));
router.use("/google", verifyBearerToken, require("./Routes/google"));

router.use("/file", require("./Routes/file"));

module.exports = router;
