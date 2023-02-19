const { getCacheData, setCacheDate } = require("../../Cache/cache");
const { v4: uuidv4 } = require("uuid");
const { pagination } = require("@utils");
const {
  notification,
  friendship,
  activity,
  post,
  user,
  like,
} = require("@subscriptions");

const createPosts = async (body, files) => {
  const data = JSON.parse(body.data);

  const products = data.products?.map((p) => {
    const image = files.find(
      (file) => file.originalname == p.uri.split("/").pop()
    );
    return {
      name: p.name,
      link: p.link,
      uuid: uuidv4(),
      image: image.filename,
    };
  });
  const persons = data.persons.map((p) => {
    return { ...p, uuid: uuidv4() };
  });
  const newPost = await post.create({
    ...data,
    uuid: uuidv4(),
    products: products,
    peoples: persons,
  });
  let cache = getCacheData();
  var friends = await friendship.getAllFriends(data.user_uuid);
  let friends_uuid = [];
  for (let i = 0; i < friends.length; i++) {
    friends_uuid.push(friends[i].friendId);
    if (cache[friends[i].friendId]) {
      cache[friends[i].friendId].push({
        uuid: newPost.uuid,
      });
    } else {
      cache[friends[i].friendId] = [{ uuid: data.uuid }];
    }
  }
  setCacheDate(cache);
  activity
    .create({
      type: "post",
      action_uuid: newPost.uuid,
      user_uuids: friends_uuid,
      user_uuid: data.user_uuid,
      keys: data.keys,
      uuid: uuidv4(),
    })
    .then((data) => console.log("activity", data));
  return newPost;
};

const sharePost = async (data) => {
  const products = data.products?.map((p) => {
    return { ...p, uuid: uuidv4() };
  });
  const newPost = await post.create({ ...data, products: products });
  const sharedPost = await getPostInfoById(data.post_uuid);
  // console.log(newPost);
  let cache = getCacheData();
  var friends = await friendship.getAllFriends(data.user_uuid);
  let friends_uuid = [];
  for (let i = 0; i < friends.length; i++) {
    friends_uuid.push(friends[i].friendId);
    if (cache[friends[i].friendId]) {
      cache[friends[i].friendId].push({
        uuid: data.uuid,
      });
    } else {
      cache[friends[i].friendId] = [{ uuid: data.uuid }];
    }
  }
  notification
    .create({
      type: "share",
      action_uuid: newPost.uuid,
      user_uuid: sharedPost.user_uuid,
      from_user_uuid: newPost.user_uuid,
      from_user_username: newPost.username,
      uuid: uuidv4(),
    })
    .then((data) => console.log("notification", data));
  activity
    .create({
      type: "share",
      action_uuid: newPost.uuid,
      user_uuids: friends_uuid,
      user_uuid: data.user_uuid,
      keys: data.keys,
      to_user_uuid: sharedPost.user_uuid,
      to_user_username: sharedPost.username,
      uuid: uuidv4(),
    })
    .then((data) => console.log("activity", data));
  return newPost;
};

const getUserPosts = async (data, page, limit) => {
  let _posts = await post.get({
    where: {
      user_uuid: data,
    },
    include: {
      likes: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  return pagination.paginatedResults(_posts.reverse(), page, limit);
};

const getAllPosts = async () =>
  post.get({
    include: {
      likes: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

const block = (uuid, message) =>
  post.update({
    where: {
      uuid: uuid,
    },
    data: {
      blocked: true,
      blocked_reason: message,
    },
  });

const unblock = (uuid) =>
  post.update({
    where: {
      uuid: uuid,
    },
    data: {
      blocked: false,
    },
  });

const getPostInfoById = async (user_uuid, post_uuid) => {
  let fetchedPost = await post.get({
    where: {
      uuid: post_uuid,
    },
    include: {
      likes: {
        where: {
          user_uuid: user_uuid,
        },
        include: {
          user: {
            select: {
              username: true,
              profile_pic: true,
            },
          },
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      products: true,
      peoples: true,
      user: {
        select: { username: true, profile_pic: true },
      },
    },
  });
  if (fetchedPost.length < 1) throw new Error("Post doesn't exists");
  let liked = false;

  if (fetchedPost[0]?.likes.length > 0) {
    liked = !fetchedPost[0].likes[0].disliked;
  }
  const likes = await like.get({
    where: {
      post_uuid: post_uuid,
      disliked: false,
    },
  });
  return { ...fetchedPost[0], liked: liked, like_count: likes.length };
};

const getForYouPost = async (uuid, page, limit) => {
  return pagination.paginatedResults(
    await post.get({
      orderBy: {
        created_at: "desc",
      },
    })
  );
  const keys = await user
    .checkId(uuid)
    .then((_user) => {
      if (_user.intrests) return _user.intrests;
      else return [];
    })
    .catch((err) => []);
  console.log(keys, "keys");
  const _posts = await post
    .get({
      where: {
        keys: {
          hasSome: keys,
        },
      },
      select: {
        uuid: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })
    .catch((err) => []);
  return pagination.paginatedResults(_posts.reverse(), page, limit);
};

const getConnectedPost = async (user_uuid, page, limit) => {
  let cache = getCacheData();
  if (!cache[user_uuid]) {
    let posts = [];
    var friends = await friendship.getAllFriends(user_uuid);
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].accepted) {
        const _post = await getUserPosts(friends[i].friendId);
        const _pt = _post.result.map((pt) => {
          return { uuid: pt.uuid };
        });
        posts = posts.concat(_pt);
      }
    }
    cache[user_uuid] = posts;
  }
  setCacheDate(cache);
  const paginatedResults = pagination.paginatedResults(
    cache[user_uuid].reverse(),
    page,
    limit
  );
  // var results = await Promise.all(
  //   paginatedResults.result.map(async (item) => {
  //     const _p = await getPostInfoById(item.uuid);
  //     return _p;
  //   })
  // );
  paginatedResults.result = paginatedResults.result.reverse();
  return paginatedResults;
};
const update = async (uuid, data) =>
  await post.update({
    where: {
      uuid: uuid,
    },
    data: data,
  });
module.exports = {
  createPosts,
  getUserPosts,
  getAllPosts,
  block,
  unblock,
  getPostInfoById,
  getForYouPost,
  update,
  sharePost,
  getConnectedPost,
};
