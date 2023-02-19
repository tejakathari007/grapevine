const { history } = require("@subscriptions");

const { v4: uuidv4 } = require("uuid");
const { pagination } = require("@utils");
const create = async (user_uuid, username, search_user_uuid) => {
  if (search_user_uuid) {
    const Previous_history = await history.get({
      where: {
        search_user_uuid: search_user_uuid,
        user_uuid: user_uuid,
      },
    });
    if (Previous_history[0]) {
      return history.update({
        where: {
          uuid: Previous_history[0].uuid,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    }
  } else {
    const Previous_history = await history.get({
      where: {
        username: username,
        user_uuid: user_uuid,
      },
    });
    if (Previous_history[0]) {
      return history.update({
        where: {
          uuid: Previous_history[0].uuid,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    }
  }
  return await history.create({
    user_uuid: user_uuid,
    username: username,
    uuid: uuidv4(),
    search_user_uuid: search_user_uuid,
  });
};
const getUserHistory = async (user_uuid, page, limit) => {
  return pagination.paginatedResults(
    await history.get({
      where: {
        user_uuid: user_uuid,
      },
    }),
    page,
    limit
  );
};
module.exports = { create, getUserHistory };
