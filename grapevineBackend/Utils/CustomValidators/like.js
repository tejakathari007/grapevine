const { PrismaClient } = require("@prisma/client");
const { Likes } = new PrismaClient();
const logger = require("@logger");

const create = async (data) =>
  Likes.create({
    data: data,
  });

const update = async (data) => Likes.update(data);
const checkLikeId = async ({ user_uuid, post_uuid }) => {
  console.log(user_uuid, post_uuid);
  return await Likes.findUnique({
    where: {
      userPostIds: {
        user_uuid: user_uuid,
        post_uuid: post_uuid,
      },
    },
  }).then((user) => user);
};

module.exports = { checkLikeId, create, update };
