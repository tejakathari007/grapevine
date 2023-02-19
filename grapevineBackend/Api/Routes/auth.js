const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { verifyBearerToken, validateReqestData, asyncWrapper },
} = require("@utils");
const { users } = require("@services");

// Login
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
    asyncWrapper(users.login(req.body.email, req.body.password), res)
);

// register
router.post(
  "/register",
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("Email"))
    .isEmail()
    .withMessage(isInvalid("email"))
    .custom(async (value) => {
      if (await users.getUserProfileFormEmail(value)) {
        return Promise.reject(resuableFalseError("Email Already in use"));
      }
    }),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("password"))
    .isLength({ min: 6 })
    .withMessage(
      resuableFalseError("Password cannot be less than 6 characters")
    ),
  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      return Promise.reject(resuableFalseError("Password does not match"));
    }
    return true;
  }),
  validateReqestData,
  (req, res) => asyncWrapper(users.create(req.body), res)
);
// Get all users
router.post("/getallusers", verifyBearerToken, (req, res) =>
  asyncWrapper(users.getAll(), res)
);

// Search
router.post(
  "/search",
  verifyBearerToken,
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("name"))
    .isString()
    .withMessage(isInvalid("name")),
  validateReqestData,
  (req, res) => asyncWrapper(users.searchUser(req.body.name), res)
);

//username is Valid
router.post(
  "/usernameIsValid",
  body("username")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("username"))
    .isString()
    .withMessage(isInvalid("username"))
    .custom((value) => !/\s/.test(value))
    .withMessage(resuableFalseError("No spaces are allowed in the username")),
  validateReqestData,
  (req, res) => asyncWrapper(users.validateUsername(req.body.username), res)
);

//email is Valid
router.post(
  "/emailIsValid",
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("email"))
    .isString()
    .isEmail()
    .withMessage(isInvalid("email")),
  validateReqestData,
  (req, res) =>
    asyncWrapper(users.validateEmail(req.body.email.toLowerCase()), res)
);

//number is Valid
router.post(
  "/numberIsValid",
  body("number")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("number"))
    .isString()
    .withMessage(isInvalid("number")),
  validateReqestData,
  (req, res) =>
    asyncWrapper(users.validateNumber(req.body.number.toLowerCase()), res)
);
// getuserFromUserId
router.post("/getuserInfo/:uuid", verifyBearerToken, (req, res) => {
  const {
    params: { uuid },
  } = req;
  asyncWrapper(users.getUserProfileFormUuid(req.user_uuid, uuid), res);
});

// getuserFromUserId
router.post("/getpartialuserInfo/:uuid", verifyBearerToken, (req, res) => {
  const {
    params: { uuid },
  } = req;
  asyncWrapper(users.getPartialUserProfileFormUuid(req.user_uuid, uuid), res);
});

module.exports = router;
