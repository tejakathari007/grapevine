const { PrismaClient } = require("@prisma/client");
const { Posts } = new PrismaClient();
const logger = require("@logger");

const create = (data) => Posts.create({ data: data });
const checkPostId = async (uuid) => {
  return await Posts.findUnique({
    where: {
      uuid: uuid,
    },
    include: {
      likes: true,
      comments: true,
    },
  }).then((user) => user);
};

const get = (data) => Posts.findMany(data);
const update = (data) => Posts.update(data);

module.exports = { checkPostId, create, get, update };
