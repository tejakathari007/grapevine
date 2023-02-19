const { PrismaClient } = require("@prisma/client");
const { Login } = new PrismaClient();
const logger = require("@logger");
const checkEmail = async (email) => {
  return await Login.findUnique({
    where: {
      email: email,
    },
    include: {
      user: true,
    },
  }).then((user) => user);
};
const checkId = async (id) => {
  return await Login.findUnique({
    where: {
      id: parseInt(id),
    },
  }).then((user) => user);
};

module.exports = { checkEmail, checkId };
