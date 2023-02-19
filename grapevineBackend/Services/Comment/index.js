const {
  user,
  comment,
  friendship,
  notification,
  activity,
  post,
} = require("@subscriptions");

const { v4: uuidv4 } = require("uuid");

const createComments = async (data) => {
  const new_comment = await comment.create(data);
  const _user = await user.checkId(data.user_uuid);
  const commented_post = await post.get({
    where: {
      uuid: data.post_uuid,
    },
    include: {
      user: true,
    },
  });
  console.log(commented_post);
  var friends = await friendship.getAllFriends(data.user_uuid);
  let friends_uuid = [];
  for (let i = 0; i < friends.length; i++) {
    friends_uuid.push(friends[i].friendId);
  }

  notification
    .create({
      type: "comment",
      action_uuid: new_comment.post_uuid,
      user_uuid: commented_post[0].user_uuid,
      from_user_uuid: _user.uuid,
      from_user_username: _user.username,
      uuid: uuidv4(),
    })
    .then((data) => console.log("notification", data));
  activity
    .create({
      type: "comment",
      action_uuid: new_comment.post_uuid,
      user_uuids: friends_uuid,
      user_uuid: _user.uuid,
      keys: _user.intrests,
      to_user_uuid: commented_post[0].user.user_uuid,
      to_user_username: commented_post[0].user.username,
      uuid: uuidv4(),
    })
    .then((data) => console.log(data, "activity"));

  return new_comment;
};
const hideComment = (uuid) =>
  comment.update({
    where: {
      uuid: uuid,
    },
    data: {
      hide: true,
    },
  });
const unhideComment = (uuid) =>
  comment.update({
    where: {
      uuid: uuid,
    },
    data: {
      hide: false,
    },
  });

const getPostComments = (post_uuid) =>
  comment.get({
    where: {
      post_uuid: post_uuid,
    },
  });

const checkUuid = async (data) => await comment.checkId(data);

module.exports = {
  createComments,
  hideComment,
  unhideComment,
  getPostComments,
  checkUuid,
};
