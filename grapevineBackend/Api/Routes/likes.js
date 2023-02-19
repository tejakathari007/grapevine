const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const { likes, users, posts } = require("@services");

router.post(
  "/create",
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
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_uuid"))
    .isString()
    .withMessage(isInvalid("post_uuid"))

    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(resuableFalseError(`Post Doesn't exists`));
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(likes.createLike(req.body), res)
);

router.post(
  "/dislike",
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
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_uuid"))
    .isString()
    .withMessage(isInvalid("post_uuid"))
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(resuableFalseError(`Post Doesn't exists`));
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(likes.disLikePost(req.body), res)
);
module.exports = router;
