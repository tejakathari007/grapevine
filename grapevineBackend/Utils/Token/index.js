const jwt = require("jsonwebtoken");

const createToken = async (object) => {
  return jwt.sign(object, process.env.jwtTokenKey);
};
const decryptToken = async (token) => {
  return await jwt.verify(token, process.env.jwtTokenKey);
};

const tokenIsValid = async (timeOfIssueInSeconds) => {
  const now = Math.ceil(Date.now() / 1000);
  const diffDay = Math.floor((now - timeOfIssueInSeconds) / (60 * 60 * 24));
  if (diffDay > process.env.tokenLifeIndays) {
    return false;
  } else {
    return true;
  }
};

module.exports = { createToken, decryptToken, tokenIsValid };
