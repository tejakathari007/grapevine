const {
  user,
  post,
  like,
  friendship,
  notification,
  activity,
} = require("@subscriptions");

const { v4: uuidv4 } = require("uuid");

const createLike = async (data) => {
  const fetched_like = await like.checkLikeId(data);
  if (!fetched_like) {
    const new_like = await like.create({ ...data, uuid: uuidv4() });
    const liked_post = await post.checkPostId(data.post_uuid);
    const _user = await user.get({ where: { uuid: data.user_uuid } });
    var friends = await friendship.getAllFriends(data.user_uuid);
    let friends_uuid = [];
    for (let i = 0; i < friends.length; i++) {
      friends_uuid.push(friends[i].friendId);
    }
    activity
      .create({
        type: "like",
        action_uuid: new_like.post_uuid,
        user_uuids: friends_uuid,
        user_uuid: new_like.user_uuid,
        keys: liked_post.keys,
        to_user_uuid: liked_post.user_uuid,
        to_user_username: _user[0].username,
        uuid: uuidv4(),
      })
      .then((data) => console.log(data, "activity"));
    notification
      .create({
        type: "like",
        action_uuid: new_like.post_uuid,
        user_uuid: liked_post.user_uuid,
        from_user_uuid: new_like.user_uuid,
        from_user_username: _user[0].username,
        uuid: uuidv4(),
      })
      .then((data) => console.log(data, "notification"));
    return new_like;
  } else {
    const like_post = await likePost(fetched_like.uuid);
    return like_post;
  }
};

const likePost = (uuid) => {
  return like.update({
    where: {
      uuid: uuid,
    },
    data: {
      disliked: false,
    },
  });
};

const disLikePost = async (data) => {
  const fetched_like = await like.checkLikeId(data);
  console.log(fetched_like);
  if (fetched_like) {
    const dislike = like.update({
      where: {
        uuid: fetched_like.uuid,
      },
      data: {
        disliked: true,
      },
    });
    return dislike;
  } else {
    throw Error("Not Liked Yet");
  }
};

module.exports = { createLike, disLikePost, likePost };
