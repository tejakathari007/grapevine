const { PrismaClient } = require("@prisma/client");
const { Activity } = new PrismaClient();
const create = (data) =>
  Activity.create({
    data: data,
  });

const get = (data) => Activity.findMany(data);

module.exports = {
  create,
  get,
};
