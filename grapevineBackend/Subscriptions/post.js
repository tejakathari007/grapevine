const { PrismaClient } = require("@prisma/client");
const { Posts } = new PrismaClient();
const logger = require("@logger");

const create = (data) =>
  Posts.create({
    data: {
      uuid: data.uuid,
      keys: data.keys,
      title: data.title,
      post_type: data.post_type,
      post: data.post,
      image_url: data.image_url,
      video_url: data.video_url,
      username: data.username,
      user_uuid: data.user_uuid,
      shared_post_uuid: data.shared_post_uuid,
      inspo: data.inspo,
      products: {
        create: data.products,
      },
      peoples: {
        create: data.peoples,
      },
    },
  });
const checkPostId = async (uuid) => {
  return await Posts.findUnique({
    where: {
      uuid: uuid,
    },
    include: {
      likes: true,
      comments: true,
    },
  }).then((user) => user);
};

const get = (data) => Posts.findMany(data);
const update = (data) => Posts.update(data);

module.exports = { checkPostId, create, get, update };
