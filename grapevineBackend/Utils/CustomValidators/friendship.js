const { PrismaClient } = require("@prisma/client");
const { FriendShip, userProfile } = new PrismaClient();
const create = async (data) => await FriendShip.create({ data: data });
const update = async (data) => await FriendShip.update(data);
const get = async (data) => await FriendShip.findMany(data);
const checkCompositKey = async (user_request, user_accept) => {
  return await FriendShip.findUnique({
    where: {
      compositKeyid: {
        user_request: user_request,
        user_accept: user_accept,
      },
    },
  }).then((friendship) => friendship);
};

const checkId = async (uuid) => {
  return await FriendShip.findUnique({
    where: {
      uuid: uuid,
    },
  }).then((friendship) => friendship);
};

const checkAcceptUser = async (uuid, user_uuid) => {
  return await FriendShip.findUnique({
    where: {
      uuid: uuid,
    },
  })
    .then((friendship) => {
      if (friendship.user_accept == user_uuid) {
        return true;
      }
      return false;
    })
    .catch((err) => false);
};

const checkUser = async (uuid, user_uuid) => {
  return await FriendShip.findUnique({
    where: {
      uuid: uuid,
    },
  })
    .then((friendship) => {
      if (
        friendship.user_accept == user_uuid ||
        friendship.user_request == user_uuid
      ) {
        return true;
      }
      return false;
    })
    .catch((err) => false);
};

const getAllFriends = async (user_uuid) => {
  let friendsData = [];
  //TODO think
  let friends = await FriendShip.findMany({
    where: {
      OR: [{ user_request: user_uuid }, { user_accept: user_uuid }],
    },
  });

  for (let i = 0; i < friends.length; i++) {
    let { user_accept, user_request, ...rest } = friends[i];

    if (user_accept == user_uuid) {
      const data = await userProfile.findMany({
        where: {
          uuid: user_request,
        },
      });
      friendsData.push({
        ...rest,
        friendId: user_request,
        hasRequested: false,
        username: data[0].username,
      });
    } else {
      const data = await userProfile.findMany({
        where: {
          uuid: user_accept,
        },
      });
      friendsData.push({
        ...rest,
        friendId: user_accept,
        hasRequested: true,
        username: data[0].username,
      });
    }
  }
  return friendsData;
};
module.exports = {
  checkCompositKey,
  checkId,
  checkAcceptUser,
  checkUser,
  getAllFriends,
  create,
  update,
  get,
};
