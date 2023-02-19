const { PrismaClient } = require("@prisma/client");
const { TiktokPost } = new PrismaClient();

const create = async (data) => TiktokPost.create({ data: data });
const createMany = async (data) => TiktokPost.createMany({ data: data });
const get = async (data) => await TiktokPost.findMany(data);
const update = (data) => TiktokPost.update(data);

module.exports = { create, get, update, createMany };
