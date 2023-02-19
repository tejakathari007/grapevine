const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const { users } = require("@services");

router.post(
  "/use",
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
  body("chatroom_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("chatroom_uuid"))
    .isString()
    .withMessage(isInvalid("chatroom_uuid")),
  validateReqestData,
  (req, res) =>
    asyncWrapper(
      users.useGrape(req.body.user_uuid, req.body.chatroom_uuid),
      res
    )
);

module.exports = router;
