const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isEmpty, isInvalid } = require("@custom_response");

const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");
const { admins } = require("@services");
router.post(
  "/login",
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("email"))
    .isEmail()
    .withMessage(isInvalid("email")),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("password"))
    .withMessage(isInvalid("password")),
  validateReqestData,
  (req, res) =>
    asyncWrapper(admins.login(req.body.email, req.body.password), res)
);

router.post(
  "/register",
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("email"))
    .isEmail()
    .withMessage(isInvalid("email")),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("password"))
    .withMessage(isInvalid("password")),
  body("username")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("username"))
    .withMessage(isInvalid("username")),
  validateReqestData,
  (req, res) => asyncWrapper(admins.create(req.body), res)
);

module.exports = router;
