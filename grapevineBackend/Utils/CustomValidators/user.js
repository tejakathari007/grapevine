const { PrismaClient } = require("@prisma/client");
const { Login, UserProfile } = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

const create = async (data) =>
  Login.create({
    data: {
      email: data.email.toLowerCase(),
      password: data.password,
      uuid: uuidv4(),
      user: {
        create: {
          username: data.username,
          uuid: uuidv4(),
          fname: data.fname,
          lname: data.lname,
          dob: "1997-07-16T19:20:30.451Z",
          tiktok: data.tiktokToken,
          tiktok_refresh: data.tiktok_refresh_token,
          insta: data.instagramToken,
          engagement_type: data.account_type,
          brand_name: data.brand_name,
          phone: data.number,
          address: data.address,
          gender: data.gender,
          ethinicity: data.ethinicity,
          collaborate: data.collaborate,
          brand_type: data.brand_type,
          intrests: data.intrests,
          agency_name: data.agency_name,
          tiktokPost: {
            create: data.tiktokPost,
          },
        },
      },
    },
  });

const get = async (data) => await UserProfile.findMany(data);
const update = async (data) => await UserProfile.update(data);

const checkEmail = async (email) => {
  return await Login.findUnique({
    where: {
      email: email,
    },
    include: {
      user: true,
    },
  }).then((user) => user);
};
const checkId = async (uuid) => {
  return await UserProfile.findUnique({
    where: {
      uuid: uuid,
    },
  }).then((user) => user);
};

const search = async (name) =>
  await UserProfile.findMany({
    where: {
      OR: [
        {
          fname: {
            contains: name,
          },
        },
        {
          lname: {
            contains: name,
          },
        },
        {
          username: {
            contains: name,
          },
        },
      ],
    },
  });

const getEmailWithId = async (uuid) => {
  return await Login.findUnique({
    where: {
      user: {
        uuid: uuid,
      },
    },
    include: {
      user: true,
    },
  });
};

module.exports = {
  checkEmail,
  checkId,
  getEmailWithId,
  create,
  search,
  get,
  update,
};
