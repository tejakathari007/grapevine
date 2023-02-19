const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");

const { comments, posts, users } = require("@services");

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
    .withMessage(isInvalid("post_uuid"))
    .isString()
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(resuableFalseError(`Post Doesn't exists`));
      }
    }),
  body("comment_text")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("comment_text"))
    .isString()
    .withMessage(isInvalid("comment_text")),
  validateReqestData,
  (req, res) =>
    asyncWrapper(
      comments.createComments({
        ...req.body,
        uuid: uuidv4(),
      }),
      res
    )
);

router.post(
  "/hide",
  body("comment_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("comment_uuid"))
    .isString()
    .withMessage(isInvalid("comment_uuid"))
    .custom(async (value) => {
      if (!(await comments.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`comment with uuid=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(comments.hideComment(req.body.comment_uuid), res)
);

router.post(
  "/unhide",
  body("comment_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("comment_uuid"))
    .isString()
    .withMessage(isInvalid("comment_uuid"))
    .custom(async (value) => {
      if (!(await comments.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`comment with uuid=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(comments.unhideComment(req.body.comment_uuid), res)
);

router.post(
  "/getPostComment",
  body("post_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("post_uuid"))
    .withMessage(isInvalid("post_uuid"))
    .isString()
    .custom(async (value) => {
      if (!(await posts.getPostInfoById(value))) {
        return Promise.reject(resuableFalseError(`Post Doesn't exists`));
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(comments.getPostComments(req.body.post_uuid), res)
);

module.exports = router;
