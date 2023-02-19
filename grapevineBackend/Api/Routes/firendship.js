const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const {
  isEmpty,
  isInvalid,
  resuableFalseError,
  success,
} = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
} = require("@utils");

const { friends, chatrooms, users } = require("@services");

router.post(
  "/sendfriendrequest",
  body("user_request")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_request"))
    .isString()
    .withMessage(isInvalid("user_request"))
    .custom(async (value) => {
      if (!(await users.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_id=${value} doesn't exists`)
        );
      }
    }),
  body("user_accept")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_accept"))
    .isString()
    .withMessage(isInvalid("user_accept"))
    .custom(async (value) => {
      if (!(await users.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_id=${value} doesn't exists`)
        );
      }
    })
    .custom(async (value, { req }) => {
      const f1 = await friends.checkCompositKey(req.body.user_request, value);
      const f2 = await friends.checkCompositKey(value, req.body.user_request);
      if (f1) {
        if (f1.accepted) {
          return Promise.reject(resuableFalseError(`Already connected`));
        }
        return Promise.reject(resuableFalseError(`Request already Sent`));
      } else if (f2) {
        if (f2.accepted) {
          return Promise.reject(resuableFalseError(`Already connected`));
        }
        return Promise.reject(resuableFalseError(`Request already Sent`));
      }
    }),
  validateReqestData,
  (req, res) =>
    asyncWrapper(
      friends.sendFriendRequest({
        ...req.body,
        uuid: uuidv4(),
      }),
      res
    )
);

router.post(
  "/acceptfriendrequest",
  body("friendship_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("friendship_uuid"))
    .isString()
    .withMessage(isInvalid("friendship_uuid"))
    .custom(async (value) => {
      const friend = await friends.checkUuid(value);
      if (!friend) {
        return Promise.reject(
          resuableFalseError(
            `friendship with friendship_uuid=${value} doesn't exists`
          )
        );
      } else if (friend.accepted) {
        return Promise.reject(resuableFalseError(`Already accepted`));
      }
    }),
  body("user_accept")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_accept"))
    .isString()
    .withMessage(isInvalid("user_accept"))
    .custom(async (value) => {
      if (!(await users.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_uuid=${value} doesn't exists`)
        );
      }
    })
    .custom(async (value, { req }) => {
      if (!(await friends.checkAcceptUser(req.body.friendship_uuid, value))) {
        return Promise.reject(
          resuableFalseError(`this user cannot accept request`)
        );
      }
    }),
  validateReqestData,
  (req, res) => {
    asyncWrapper(friends.acceptFriendRequest(req.body.friendship_uuid), res);
  }
);

router.post(
  "/ignorefriendrequest",
  body("friendship_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("friendship_uuid"))
    .isString()
    .withMessage(isInvalid("friendship_uuid"))
    .custom(async (value) => {
      const friend = await friends.checkUuid(value);
      if (!friend) {
        return Promise.reject(
          resuableFalseError(
            `friendship with friendship_uuid=${value} doesn't exists`
          )
        );
      } else if (friend.accepted) {
        return Promise.reject(resuableFalseError(`Already accepted`));
      }
    }),
  body("user_accept")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_accept"))
    .isString()
    .withMessage(isInvalid("user_accept"))
    .custom(async (value) => {
      if (!(await users.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_uuid=${value} doesn't exists`)
        );
      }
    })
    .custom(async (value, { req }) => {
      if (!(await friends.checkAcceptUser(req.body.friendship_uuid, value))) {
        return Promise.reject(
          resuableFalseError(`this user cannot accept request`)
        );
      }
    }),
  validateReqestData,
  (req, res) => {
    asyncWrapper(friends.ignoreFriendRequest(req.body.friendship_uuid), res);
  }
);

router.post(
  "/block",
  body("friendship_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("friendship_uuid"))
    .isString()
    .withMessage(isInvalid("friendship_uuid"))
    .custom(async (value) => {
      if (!(await friends.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(
            `friendship with friendship_uuid=${value} doesn't exists`
          )
        );
      }
    }),
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
          resuableFalseError(`user with user_uuid=${value} doesn't exists`)
        );
      }
    })
    .custom(async (value, { req }) => {
      if (!(await friends.checkUser(req.body.friendship_uuid, value))) {
        return Promise.reject(
          resuableFalseError(`this user cannot block friendship`)
        );
      }
    }),
  validateReqestData,
  (req, res) =>
    asyncWrapper(
      friends.block(req.body.friendship_uuid, req.body.user_uuid),
      res
    )
);

router.post(
  "/unblock",
  body("friendship_uuid")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("friendship_uuid"))
    .isString()
    .withMessage(isInvalid("friendship_uuid"))
    .custom(async (value) => {
      if (!(await friends.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(
            `friendship with friendship_uuid=${value} doesn't exists`
          )
        );
      }
    }),
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
          resuableFalseError(`user with user_uuid=${value} doesn't exists`)
        );
      }
    })
    .custom(async (value, { req }) => {
      if (!(await friends.checkBlockingUser(req.body.friendship_uuid, value))) {
        return Promise.reject(
          resuableFalseError(`this user cannot Unblock this friendship`)
        );
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(friends.unblock(req.body.friendship_uuid), res)
);

router.post(
  "/getfriendrequest",
  body("user_accept")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("user_accept"))
    .isString()
    .withMessage(isInvalid("user_accept"))
    .custom(async (value) => {
      if (!(await users.checkUuid(value))) {
        return Promise.reject(
          resuableFalseError(`user with user_id=${value} doesn't exists`)
        );
      }
    }),
  validateReqestData,
  (req, res) => asyncWrapper(friends.getFriendRequest(req.body), res)
);
router.post(
  "/getAllFriends",

  (req, res) =>
    asyncWrapper(
      friends.getFriends({
        user_uuid: req.user_uuid,
        page: req.query.page,
        limit: req.query.limit,
        searchParam: req.query.search ?? "",
      }),
      res
    )
);

module.exports = router;
