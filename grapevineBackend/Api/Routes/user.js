const express = require("express");
const router = express.Router();
const {
  middleware: { verifyBearerToken, asyncWrapper },
  multer: { uploadFiles },
} = require("@utils");
const _ = require("lodash");

const { users } = require("@services");
router.post("/updateUser", (req, res) => {
  asyncWrapper(users.update(req.body.user_uuid, req.body.data), res);
});

router.post("/getFeatured", verifyBearerToken, (req, res) => {
  asyncWrapper(
    users.getFeatured(req.user_uuid, req.query.page, req.query.limit, req.body),
    res
  );
});
router.post("/getCreators", verifyBearerToken, (req, res) => {
  asyncWrapper(
    users.getCreators(req.user_uuid, req.query.page, req.query.limit, req.body),
    res
  );
});

router.post("/getAllChatRoom", verifyBearerToken, (req, res) => {
  asyncWrapper(
    users.getFriends({
      user_uuid: req.user_uuid,
      page: req.query.page,
      limit: req.query.limit,
      searchParam: req.query.search ?? "",
    }),
    res
  );
});

router.get("/getYoutubeVideos", verifyBearerToken, (req, res) => {
  asyncWrapper(
    users.getYoutubeVideo(req.user_uuid, req.query.page, req.query.limit),
    res
  );
});
router.get("/getBrands", (req, res) => {
  asyncWrapper(
    users.getBrands(req.query.page, req.query.limit, req.query.search),
    res
  );
});

router.get("/confirmEmployee/:employeeUuid", (req, res) => {
  asyncWrapper(users.confirmEmployee(req.params.employeeUuid, res), res);
});

router.post("/changeProfile", verifyBearerToken, uploadFiles, (req, res) => {
  asyncWrapper(users.updateProfileImage(req), res);
});
module.exports = router;
