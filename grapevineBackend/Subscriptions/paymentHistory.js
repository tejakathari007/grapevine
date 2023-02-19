const { PrismaClient } = require("@prisma/client");
const { PaymentHistory } = new PrismaClient();

const create = async (data) => PaymentHistory.create({ data: data });
const createMany = async (data) => TiktokPost.createMany({ data: data });
const get = async (data) => await PaymentHistory.findMany(data);
const update = async (data) => await PaymentHistory.update(data);

module.exports = { create, get, update, createMany };
