const { notification } = require("@subscriptions");
const { pagination } = require("@utils");
const create = (data) => notification.create(data);

const get = async (uuid, page, limit) =>
  pagination.paginatedResults(
    await notification.get({
      where: {
        user_uuid: uuid,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    page,
    limit
  );

module.exports = {
  create,
  get,
};
