const { token, pagination, mailService, twilio } = require("@utils");
const { user, friendship, chatroom, notification } = require("@subscriptions");
const { fetchVideos } = require("../TiktokPost/index");
const { v4: uuidv4 } = require("uuid");
const { fetchUserVideos, fetchAccessTokenFromRefresh } = require("../Google");

// create user
const create = async (data) => {
  const _user_number = await user.checkNumber(data.number);
  if (_user_number) throw Error("Number Already Registered");
  const new_user = await user.create(data);
  const u = await user.checkEmail(new_user.email);
  if (u.user.engagement_type == "Employee") {
    const employer = await user.getUnique({
      where: {
        uuid: u.user.employerUuid,
      },
      include: {
        login: true,
      },
    });
    await mailService
      .confirmEmployment(
        employer.login.email,
        u.email,
        u.user.fname + " " + u.user.lname,
        u.user.employeeRole,
        `https://admin.grapevine-app.co/api/user/confirmEmployee/${u.user.uuid}`
      )
      .catch((error) => {
        throw Error("Something went wrong");
      });
    return u.user;
  }

  var user_token = await token.createToken(u).catch((err) => {
    throw Error(err.message);
  });
  return { token: user_token, ...u.user, friends: [] };
};

// login user
const login = async (email, password) => {
  const fetched_user = await user.checkEmail(email);
  if (!fetched_user) {
    throw Error("Email not registered");
  } else {
    if (fetched_user.password == password) {
      var user_token = await token.createToken(fetched_user).catch((err) => {
        throw Error(err.message);
      });
      // get all friends
      const friends = await friendship.get({
        where: {
          OR: [
            { user_accept: fetched_user.user.uuid },
            {
              user_request: fetched_user.user.uuid,
            },
          ],
          accepted: true,
        },
      });
      const responseData = [];

      return { token: user_token, ...fetched_user.user, friends: responseData };
    } else {
      throw Error("Password doesn't match");
    }
  }
};

// search user
const searchUser = async (name) => await user.search(name);

// check if username is available or not
const validateUsername = async (username) => {
  const fetched_users = await user.get({
    where: {
      username: username,
    },
  });
  if (fetched_users.length > 0) {
    throw Error("Invalid Username");
  } else {
    return { valid: true };
  }
};

// check if email is valid or not and send code id valid
const validateEmail = async (email) => {
  const fetched_user = await user.checkEmail(email.toLowerCase());
  if (fetched_user) {
    throw Error("Email already in use");
  } else {
    // code = "11111";
    const code = Math.floor(10000 + Math.random() * 9000);
    await mailService.sendCodeToUserEmail(email, code).catch((error) => {
      console.log(error);
      throw Error("Something went wrong");
    });
    return { code: code };
  }
};

const validateNumber = async (number) => {
  const fetched_user = await user.checkNumber(number);

  if (fetched_user) {
    throw Error("Number already in use");
  } else {
    const code = Math.floor(10000 + Math.random() * 9000);
    twilio.sendSms(number, `Your code is ${code}`);
    return { code: code };
  }
};

const getUserProfileFormEmail = async (email) => {
  return await user.checkEmail(email);
};

const update = async (uuid, data) => {
  return await user.update({
    where: {
      uuid: uuid,
    },
    data: data,
  });
};

const useGrape = async (user_uuid, chatroom_uuid) => {
  let _user = await user.get({
    where: {
      uuid: user_uuid,
    },
  });
  _user = _user[0];
  if (_user?.grapes && _user.grapes > 0) {
    const updatedUser = await user
      .update({
        where: {
          uuid: user_uuid,
        },
        data: {
          grapes: _user.grapes - 1,
        },
      })
      .catch((err) => console.log(err));

    if (updatedUser) {
      const _chatroom = await chatroom
        .update({
          where: { uuid: chatroom_uuid },
          data: {
            valid_room: true,
          },
        })
        .catch((err) => null);
      return _chatroom;
    } else {
      return null;
    }
  } else {
    throw Error("Not Enough Grapes");
  }
};
const getAll = async () => await user.get({});

const checkUuid = async (uuid) => await user.checkId(uuid);

const getUserProfileFormUuid = async (request_user_uuid, user_uuid) => {
  const fetched_user = await user.get({
    where: {
      uuid: user_uuid,
    },
    include: {
      posts: {
        select: {
          uuid: true,
          id: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
      activities: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      },
      chatroom: {
        where: {
          user: {
            some: {
              uuid: request_user_uuid,
            },
          },
        },
        include: {
          user: {
            where: {
              NOT: {
                uuid: request_user_uuid,
              },
            },
            select: {
              username: true,
              uuid: true,
            },
          },
        },
      },
      _count: {
        select: { posts: true },
      },
    },
  });
  const tiktokPost = await fetchVideos(
    fetched_user[0].tiktok,
    fetched_user[0].tiktok_open_id
  );
  let friend;
  if (request_user_uuid) {
    if (request_user_uuid != user_uuid) {
      const _request_user = await user.get({
        where: {
          uuid: request_user_uuid,
        },
      });
      notification
        .create({
          type: "view_profile",
          action_uuid: request_user_uuid,
          user_uuid: user_uuid,
          from_user_uuid: request_user_uuid,
          from_user_username: _request_user[0].username,
          uuid: uuidv4(),
        })
        .then((data) => console.log(data, "notification"));
    }
    friend =
      (await friendship.checkCompositKey(request_user_uuid, user_uuid)) ||
      (await friendship.checkCompositKey(user_uuid, request_user_uuid));
  }
  let connections = await friendship.getConnections(user.uuid);
  let followers = await friendship.getFollowers(user.uuid);
  if (fetched_user.length > 0) {
    return {
      ...fetched_user[0],
      tiktokPost: tiktokPost,
      friendship_status: friend,
      _count: {
        ...fetched_user[0]._count,
        connections: connections.length,
        followers: followers.length,
      },
    };
  } else {
    throw Error("No User with uuid= " + uuid);
  }
};

const getPartialUserProfileFormUuid = async (request_user_uuid, user_uuid) => {
  const fetched_user = await user.get({
    where: {
      uuid: user_uuid,
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
  let friend;
  if (request_user_uuid) {
    friend =
      (await friendship.checkCompositKey(request_user_uuid, user_uuid)) ||
      (await friendship.checkCompositKey(user_uuid, request_user_uuid));
  }
  let connections = await friendship.getConnections(user.uuid);
  let followers = await friendship.getFollowers(user.uuid);
  if (fetched_user.length > 0) {
    return {
      ...fetched_user[0],
      friendship_status: friend,
      _count: {
        ...fetched_user[0]._count,
        connections: connections.length,
        followers: followers.length,
      },
    };
  } else {
    throw Error("No User with uuid= " + uuid);
  }
};
const getFeatured = async (user_uuid, page, limit, condition = {}) => {
  let users = await user.get({
    where: {
      ...condition,
      NOT: {
        uuid: user_uuid,
      },
      featured: true,
    },
    select: {
      uuid: true,
    },
  });

  return pagination.paginatedResults(users, page, limit);
};

const getCreators = async (user_uuid, page, limit, condition = {}) => {
  let users = await user.get({
    where: {
      ...condition,
      NOT: {
        uuid: user_uuid,
      },
      engagement_type: "Creator",
    },
  });

  return pagination.paginatedResults(users, page, limit);
};

const getFriends = async ({ user_uuid, page, limit, searchParam }) => {
  let user_data = await user.get({
    where: {
      uuid: user_uuid,
    },
    include: {
      chatroom: {
        where: {
          OR: [
            {
              name: {
                contains: searchParam,
                mode: "insensitive",
              },
            },
            {
              user: {
                some: {
                  username: {
                    contains: searchParam,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
        include: {
          user: {
            where: {
              NOT: {
                uuid: user_uuid,
              },
            },
            select: {
              username: true,
              uuid: true,
            },
          },
        },
      },
    },
  });
  const data = pagination.paginatedResults(
    user_data[0].chatroom.reverse(),
    page,
    limit
  );
  return data;
};

const getYoutubeVideo = async (user_uuid, page_token = " ", limit = 5) => {
  const _user = await user.checkId(user_uuid);
  if (!_user.google_token) return { result: [] };
  const videos = await fetchUserVideos(_user.google_token, page_token, limit);
  if (videos.error) {
    const token = await fetchAccessTokenFromRefresh(_user.google_refresh_token);
    const updated_user = await user.update({
      where: {
        uuid: user_uuid,
      },
      data: {
        google_token: token.access_token,
      },
    });
    const refetched_video = await fetchUserVideos(
      updated_user.google_token,
      page_token,
      limit
    );
    return {
      next: refetched_video.nextPageToken,
      result: refetched_video.items,
    };
  }
  return { next: videos.nextPageToken, result: videos.items };
};

const getBrands = async (page = 1, limit = 5, searchParam = "") => {
  let users = [];
  if (searchParam == "") {
    users = await user.get({
      where: {
        engagement_type: "Brand",
      },
    });
  } else {
    users = await user.get({
      where: {
        engagement_type: "Brand",
        OR: [
          {
            brand_name: {
              contains: searchParam,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  }

  return pagination.paginatedResults(users, page, limit);
};

const confirmEmployee = async (uuid, res) => {
  const _user = await user.update({
    where: {
      uuid: uuid,
    },
    data: {
      employeeConfirm: true,
    },
  });
  res.redirect("/");
};

const updateProfileImage = async (req) => {
  // console.log(req.files);
  if (req.files) {
    const _user = await user.update({
      where: {
        uuid: req.user_uuid,
      },
      data: {
        profile_pic: req.files[0].filename,
      },
    });
    return { success: true };
  }
  throw new Error("Something Went Wrong");
};
module.exports = {
  create,
  getUserProfileFormUuid,
  update,
  useGrape,
  getUserProfileFormEmail,
  login,
  searchUser,
  validateUsername,
  validateEmail,
  checkUuid,
  getAll,
  getFeatured,
  getCreators,
  getPartialUserProfileFormUuid,
  getFriends,
  getYoutubeVideo,
  getBrands,
  confirmEmployee,
  updateProfileImage,
  validateNumber,
};
