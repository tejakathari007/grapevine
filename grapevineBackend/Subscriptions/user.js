const { PrismaClient } = require("@prisma/client");
const { Login, UserProfile } = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

const create = async (data) => {
  const tiktok_post = data.tiktokPost?.map((tiktok) => {
    return { ...tiktok, uuid: uuidv4() };
  });
  return Login.create({
    data: {
      email: data.email.toLowerCase(),
      password: data.password,
      uuid: uuidv4(),
      user: {
        create: {
          username: data.username
            ? data.username
            : data.brand_name
            ? data.brand_name
            : data.agency_name
            ? data.agency_name
            : data.fname + " " + data.lname,
          uuid: uuidv4(),
          fname: data.fname,
          lname: data.lname,
          dob: "1997-07-16T19:20:30.451Z",
          tiktok: data.tiktokToken,
          tiktok_refresh: data.tiktok_refresh_token,
          instagram_token: data.instagramToken,
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
          tiktok_open_id: data.tiktok_open_id,
          google_token: data.google_token,
          google_refresh_token: data.google_refresh_token,
          employerUuid: data.employerUuid,
          employeeRole: data.employeeRole,
          position: data.position,
          instagram_token: data.instagramToken,
          tiktokPost: {
            create: tiktok_post,
          },
        },
      },
    },
  });
};

const get = async (data) => await UserProfile.findMany(data);
const update = async (data) => await UserProfile.update(data);
const getUnique = async (data) => await UserProfile.findUnique(data);

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

const checkNumber = async (number) => {
  return await UserProfile.findUnique({
    where: {
      phone: number,
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

const search = async (name) => {
  if (name == "*") {
    const users = await UserProfile.findMany({});
    return users.slice(0, 4);
  } else {
    return await UserProfile.findMany({
      where: {
        OR: [
          {
            fname: {
              contains: name,
              mode: "insensitive",
            },
          },
          {
            lname: {
              contains: name,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: name,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  }
};

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
  getUnique,
  checkNumber,
};
