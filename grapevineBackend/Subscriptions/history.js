const { PrismaClient } = require("@prisma/client");
const { SearchHistory } = new PrismaClient();

const create = async (data) => {
  return await SearchHistory.create({
    data: data,
  });
};

const update = async (data) => SearchHistory.update(data);
const get = async (data) =>
  SearchHistory.findMany({ ...data, orderBy: [{ updated_at: "desc" }] });
const getUnique = async (data) => SearchHistory.findUnique(data);

module.exports = { create, update, get, getUnique };
