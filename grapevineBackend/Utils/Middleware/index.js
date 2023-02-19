const { decryptToken, tokenIsValid } = require("../Token");
const {
  errorFormatter,
  resuableFalseError,
  success,
} = require("@custom_response");
const logger = require("@logger");

const { validationResult } = require("express-validator");

const verifyBearerToken = async (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (bearer) {
    const token = bearer.split(" ")[1];
    await decryptToken(token)
      .then((data) => {
        if (tokenIsValid(token)) {
          if (data.user) req.user_uuid = data.user.uuid;
          next();
        } else {
          res.json(resuableFalseError("Token Life Expired"));
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(resuableFalseError("Invalid Token"));
      });
  } else {
    res.json(resuableFalseError("Missing Bearer Token"));
  }
};

const validateReqestData = async (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    const error = result.array({ onlyFirstError: true })[0];
    logger.error(
      `/register ${JSON.stringify(error)} email:${JSON.stringify(
        req.body.email
      )}`
    );
    return res.json({ ...error });
  } else {
    next();
  }
};

const asyncWrapper = async (fn, res) => {
  try {
    const response_data = await fn;
    res.json(success(response_data, "Successfull"));
  } catch (err) {
    console.log(err);
    res.json(resuableFalseError(err.message));
  }
};
module.exports = { verifyBearerToken, validateReqestData, asyncWrapper };
