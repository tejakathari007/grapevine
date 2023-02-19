const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const logger = require("@logger");
const {
  isEmpty,
  isInvalid,
  errorFormatter,
  resuableFalseError,
  success,
} = require("@custom_response");

const {
  customValidation: { user, post, comment },
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const { commentLikes } = require("@services");

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
      if (!(await user.checkId(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_uuid=${value} doesn't exists`)
        );
      }
    }),
  body("comment_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("comment_uuid"))
    .isString()
    .withMessage(isInvalid("comment_uuid"))
    .custom(async (value) => {
      if (!(await comment.checkId(value))) {
        return Promise.reject(
          resuableFalseError(
            `comment with comment_uuid=${value} doesn't exists`
          )
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
      if (!(await post.checkPostId(value))) {
        return Promise.reject(
          resuableFalseError(`post with post_uuid=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  async (req, res) => {
    const l = await commentLikes.check(
      req.body.comment_uuid,
      req.body.user_uuid
    );
    if ((l.disLike = true)) {
      commentLikes
        .disLike(l.uuid)
        .then((data) => {
          res.json(success(data, "Sucessfully DisLiked Comment"));
        })
        .catch((err) => {
          console.log(err);
          res.json(resuableFalseError(err));
        });
    } else {
      res.json(resuableFalseError("like not created"));
    }
  }
);

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
      if (!(await user.checkId(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_uuid=${value} doesn't exists`)
        );
      }
    }),
  body("comment_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("comment_uuid"))
    .isString()
    .withMessage(isInvalid("comment_uuid"))
    .custom(async (value) => {
      if (!(await comment.checkId(value))) {
        return Promise.reject(
          resuableFalseError(`comment with id=${value} doesn't exists`)
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
      if (!(await post.checkPostId(value))) {
        return Promise.reject(
          resuableFalseError(`post with post_uuid=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  async (req, res) => {
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      const error = result.array({ onlyFirstError: true })[0];
      logger.error(`/Post ${JSON.stringify(error)} `);
      return res.json({ data: error });
    }
    const l = await commentLikes.check(
      req.body.comment_uuid,
      req.body.user_uuid
    );
    if (!l) {
      commentLikes
        .createCommentLikes({ ...req.body, uuid: uuidv4() })
        .then((data) => {
          res.json(success(data, "Sucessfully Liked Comment"));
        })
        .catch((err) => {
          console.log(err);
          res.json(resuableFalseError(err));
        });
    } else {
      commentLikes
        .like(l.uuid)
        .then((data) => {
          res.json(success(data, "Sucessfully Liked Comment"));
        })
        .catch((err) => {
          console.log(err);
          res.json(resuableFalseError(err));
        });
    }
  }
);

module.exports = router;
