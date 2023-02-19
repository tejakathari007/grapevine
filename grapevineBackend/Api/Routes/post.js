const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");

const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const {
  middleware: { verifyBearerToken },
  multer: { uploadFiles },
} = require("@utils");
const { posts, users, tiktoks, instagrams } = require("@services");

router.post("/create", verifyBearerToken, uploadFiles, (req, res) =>
  asyncWrapper(
    posts.createPosts(
      {
        ...req.body,
      },
      req.files
    ),
    res
  )
);

router.post(
  "/share",
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_id"))
    .isString()
    .withMessage(isInvalid("post_id"))
    .custom(async (value) => {
      const fetched_post = await posts.getPostInfoById(value);
      if (!fetched_post) {
        return Promise.reject(
          resuableFalseError(`user with post_id=${value} doesn't exists`)
        );
      }
    }),
  body("username")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("username"))
    .isString()
    .withMessage(isInvalid("username")),
  body("user_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_uuid"))
    .isString()
    .withMessage(isInvalid("user_uuid"))
    .custom(async (value) => {
      if (!(await users.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_id=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) =>
    asyncWrapper(
      posts.sharePost({
        user_uuid: req.body.user_uuid,
        shared_post_uuid: req.body.post_uuid,
        uuid: uuidv4(),
        post: req.body.post,
        username: req.body.username,
        keys: req.body.keys,
        products: req.body.products,
      }),
      res
    )
);

router.post(
  "/block",
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_id"))
    .isString()
    .withMessage(isInvalid("post_id"))
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(
          resuableFalseError(`user with post_id=${value} doesn't exists`)
        );
      }
    }),
  body("message")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("message")),
  validateReqestData,
  (req, res) =>
    asyncWrapper(posts.block(req.body.post_uuid, req.body.message), res)
);

router.post(
  "/unblock",
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_id"))
    .isString()
    .withMessage(isInvalid("post_id"))
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(
          resuableFalseError(`user with post_id=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(posts.unblock(req.body.post_uuid), res)
);

router.post(
  "/userTikTokVideos",
  body("user_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_uuid"))
    .isString()
    .withMessage(isInvalid("user_uuid")),
  validateReqestData,
  verifyBearerToken,
  async (req, res) => {
    asyncWrapper(tiktoks.getUserPosts(req.body.user_uuid), res);
  }
);

router.post("/userInstagramMedia", verifyBearerToken, async (req, res) => {
  asyncWrapper(instagrams.getUserMedias(req.user_uuid), res);
});

router.post("/connectedPost", (req, res) =>
  asyncWrapper(
    posts.getConnectedPost(req.user_uuid, req.query.page, req.query.limit),
    res
  )
);

router.post("/forYouPost", (req, res) => {
  asyncWrapper(
    posts.getForYouPost(req.user_uuid, req.query.page, req.query.limit),
    res
  );
});

router.post("/userposts", (req, res) =>
  asyncWrapper(
    posts.getUserPosts(req.body.uuid, req.query.page, req.query.limit),
    res
  )
);

router.post(
  "/getPostByUuid",
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_id"))
    .isString()
    .withMessage(isInvalid("post_id"))
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(
          resuableFalseError(`user with post_id=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) =>
    asyncWrapper(posts.getPostInfoById(req.user_uuid, req.body.post_uuid), res)
);

router.post("/all", (req, res) =>
  asyncWrapper(posts.getAllPosts(req.query.page, req.query.limit), res)
);

router.post(
  "/update",
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_id"))
    .isString()
    .withMessage(isInvalid("post_id"))
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(
          resuableFalseError(`user with post_id=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) =>
    asyncWrapper(posts.update(req.body.post_uuid, req.body.data), res)
);

module.exports = router;
