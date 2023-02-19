const { PrismaClient } = require("@prisma/client");
const { CommentLikes } = new PrismaClient();

const createCommentLikes = (data) =>
  CommentLikes.create({
    data: data,
  });

const like = (uuid) => {
  return CommentLikes.update({
    where: {
      uuid: uuid,
    },
    data: {
      disliked: false,
    },
  });
};

const disLike = (uuid) => {
  return CommentLikes.update({
    where: {
      uuid: uuid,
    },
    data: {
      disliked: true,
    },
  });
};

const check = async (comment_uuid, user_uuid) =>
  await CommentLikes.findUnique({
    where: {
      commentLikeId: {
        comment_uuid: comment_uuid,
        user_uuid: user_uuid,
      },
    },
  });

module.exports = { createCommentLikes, disLike, like, check };
