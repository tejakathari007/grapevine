const { PrismaClient } = require("@prisma/client");
const { Notification } = new PrismaClient();

const create = (data) =>
  Notification.create({
    data: data,
  });

const get = async (data) => await Notification.findMany(data);

module.exports = {
  create,
  get,
};
