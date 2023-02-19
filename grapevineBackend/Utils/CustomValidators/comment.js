const { PrismaClient } = require("@prisma/client");
const { Comments } = new PrismaClient();
const checkId = async (uuid) => {
  return await Comments.findUnique({
    where: {
      uuid: uuid,
    },
  }).then((user) => user);
};

const create = async (data) => await Comments.create({ data: data });
const update = async (data) => await Comments.update(data);
const get = async (data) => await Comments.findMany(data);
module.exports = { checkId, create, update, get };
