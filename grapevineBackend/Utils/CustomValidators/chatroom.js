const { PrismaClient } = require("@prisma/client");
const { ChatRoom } = new PrismaClient();

const create = (data) =>
  ChatRoom.create({
    data: data,
  });

const update = async (data) => {
  return await ChatRoom.update(data);
};

module.exports = { create, update };
