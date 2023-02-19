const { activity, user } = require("@subscriptions");
const { pagination } = require("@utils");
const create = (data) =>
  activity.create({
    data: data,
  });

const getConnected = async (uuid, page, limit) =>
  pagination.paginatedResults(
    await activity.get({
      where: {
        user_uuids: {
          has: uuid,
        },
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

const getForYou = async (uuid, page, limit) => {
  const keys = await user
    .checkId(uuid)
    .then((_user) => {
      if (_user.intrests) return _user.intrests;
      else return [];
    })
    .catch((err) => []);
  const activities = await activity.get({
    where: {
      keys: {
        hasSome: keys,
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return pagination.paginatedResults(activities, page, limit);
};

const getUserActivity = async (uuid, page, limit) => {
  const _activities = await activity.get({
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
  });
  return pagination.paginatedResults(_activities.reverse(), page, limit);
};
module.exports = {
  create,
  getConnected,
  getForYou,
  getUserActivity,
};
