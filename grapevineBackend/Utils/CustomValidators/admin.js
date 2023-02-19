const { PrismaClient } = require("@prisma/client");
const { Admin } = new PrismaClient();
const checkEmail = async (email) => {
  return await Admin.findUnique({
    where: {
      email: email,
    },
  }).then((user) => user);
};
const checkId = async (uuid) => {
  return await Admin.findUnique({
    where: {
      uuid: uuid,
    },
  }).then((user) => user);
};

const create = async (data) => await Admin.create({ data: data });
const get = async (data) => await Admin.get(data);

module.exports = { checkEmail, checkId, create, get };
