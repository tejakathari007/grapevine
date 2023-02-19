const success = (data, message = "", code = 200) => {
  return { status: true, data, message, code };
};

const resuableFalseError = (message, code = 400) => {
  return { status: false, code, message };
};

const isEmpty = (field) => resuableFalseError(`${field} cannot be empty`);

const isInvalid = (field) => resuableFalseError(`${field} is invalid type`);

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return msg;
};

module.exports = {
  resuableFalseError,
  isEmpty,
  isInvalid,
  errorFormatter,
  success,
};
