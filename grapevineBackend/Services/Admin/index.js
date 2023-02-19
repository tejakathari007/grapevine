const { v4: uuidv4 } = require("uuid");
const { token } = require("@utils");

const { admin } = require("@subscriptions");

const login = async (email, password) => {
  const _admin = await admin.checkEmail(email);
  if (_admin) {
    if (_admin.password == password) {
      var _token = await token.createToken(admin).catch((err) => {
        throw Error(err.message);
      });
      return {
        token: _token,
        username: admin.username,
        uuid: admin.uuid,
        id: admin.id,
        email: admin.email,
      };
    } else {
      throw Error("Password Incorrect");
    }
  } else {
    throw Error("Email not registered");
  }
};
const create = ({ email, password, username }) =>
  admin
    .create({
      email: email,
      password: password,
      username: username,
      uuid: uuidv4(),
    })
    .then((data) => data);

module.exports = { create, login };
