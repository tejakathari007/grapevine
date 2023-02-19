const customValidation = require("./CustomValidators");
const token = require("./Token");
const middleware = require("./Middleware");
const mailService = require("./Mail Service/Services");
const pagination = require("./Pagination");
const multer = require("./Multer");
const aws = require("./Aws");
const twilio = require("./Twilio");
module.exports = {
  customValidation,
  token,
  middleware,
  mailService,
  pagination,
  multer,
  aws,
  twilio,
};
