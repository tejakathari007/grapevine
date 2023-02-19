const { user, friendship, chatroom, notification } = require("@subscriptions");
const { pagination } = require("@utils");

const { v4: uuidv4 } = require("uuid");

const sendFriendRequest = async (data) => {
  const friend = await friendship.create(data);
  const _user = await user.get({
    where: {
      uuid: friend.user_request,
    },
  });
  notification
    .create({
      type: "friendship_request",
      action_uuid: friend.user_request,
      user_uuid: friend.user_accept,
      from_user_uuid: friend.user_request,
      from_user_username: _user[0].username,
      uuid: uuidv4(),
    })
    .then((data) => console.log(data, "notification"));
  return friend;
};

const checkAcceptUser = async (frinedship_uuid, user_accept) => {
  const friendRequest = await friendship.get({
    where: {
      uuid: frinedship_uuid,
    },
  });
  if ((friendRequest[0].user_accept = user_accept)) {
    return true;
  } else {
    return false;
  }
};

const acceptFriendRequest = async (uuid) => {
  const updated_friendship = await friendship.update({
    where: {
      uuid: uuid,
    },
    data: {
      accepted: true,
    },
  });
  const room = await chatroom.create({
    uuid: uuidv4(),
    user: {
      connect: [
        { uuid: updated_friendship.user_request },
        { uuid: updated_friendship.user_accept },
      ],
    },
  });
  const _user = await user.get({
    where: {
      uuid: updated_friendship.user_accept,
    },
  });
  notification
    .create({
      type: "friendship_accept",
      action_uuid: updated_friendship.user_accept,
      user_uuid: updated_friendship.user_request,
      from_user_uuid: updated_friendship.user_accept,
      from_user_username: _user[0].username,
      uuid: uuidv4(),
    })
    .then((data) => console.log(data, "notification"));
  return { ...updated_friendship, chatroom: room };
};
const ignoreFriendRequest = async (uuid) => {
  const updated_friendship = await friendship.update({
    where: {
      uuid: uuid,
    },
    data: {
      ignored: true,
    },
  });

  return { ...updated_friendship };
};
const checkUuid = async (uuid) => await friendship.checkId(uuid);

const checkUser = async (uuid, user_uuid) => {
  const friend = await friendship.get({
    where: {
      uuid: uuid,
    },
  });
  if (
    friend[0].user_accept == user_uuid ||
    friend[0].user_request == user_uuid
  ) {
    return true;
  }
  return false;
};

const checkCompositKey = async (user_request, user_accept) =>
  await friendship.checkCompositKey(user_request, user_accept);

const block = (uuid, user_uuid) =>
  friendship.update({
    where: {
      uuid: uuid,
    },
    data: {
      blocked: true,
      blocked_by: user_uuid,
    },
  });

const checkBlockingUser = async (uuid, user_uuid) => {
  return await friendship
    .get({
      where: {
        uuid: uuid,
      },
    })
    .then((friendship) => {
      if (friendship[0].blocked_by == user_uuid) {
        return true;
      }
      return false;
    })
    .catch((err) => false);
};

const unblock = (uuid) =>
  friendship.update({
    where: {
      uuid: uuid,
    },
    data: {
      blocked: false,
    },
  });

const getFriendRequest = async ({ user_accept }) => {
  const allFriends = await friendship.get({
    where: {
      accepted: false,
      user_accept: user_accept,
      ignored: false,
    },
  });
  const response = [];
  for (let i = 0; i < allFriends.length; i++) {
    const u = await user.checkId(allFriends[i].user_request);
    response.push({ ...allFriends[i], username: u.username });
  }
  return response;
};

const getFriends = async ({ user_uuid, page, limit, searchParam }) => {
  const friends = await friendship.get({
    where: {
      OR: [
        { user_accept: user_uuid },
        {
          user_request: user_uuid,
        },
      ],
      accepted: true,
    },
  });
  const responseData = [];
  for (let i = 0; i < friends.length; i++) {
    let info;
    let uuid =
      user_uuid == friends[i].user_accept
        ? friends[i].user_request
        : friends[i].user_accept;
    info = await user.checkId(uuid);
    if (info.username.includes(searchParam)) {
      responseData.push({
        friendship_uuid: friends[i].uuid,
        username: info.username,
        fname: info.fname,
        lname: info.lname,
        user_uuid: uuid,
        type: info.engagement_type,
        uuid: friends[i].uuid,
      });
    }
  }
  return pagination.paginatedResults(responseData, page, limit);
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  block,
  unblock,
  getFriendRequest,
  getFriends,
  checkAcceptUser,
  checkUuid,
  checkCompositKey,
  checkUser,
  checkBlockingUser,
  ignoreFriendRequest,
};
