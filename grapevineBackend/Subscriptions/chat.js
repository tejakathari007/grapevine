const { PrismaClient } = require("@prisma/client");
const { Chats } = new PrismaClient();

const create = (data) => Chats.create({ data: data });
const get = (data) => Chats.findMany(data);

module.exports = { create, get };
