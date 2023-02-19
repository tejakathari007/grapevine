const { chatroom, user } = require("@subscriptions");
const { v4: uuidv4 } = require("uuid");

const create = async (data) => {
  const room = await chatroom.create({
    uuid: uuidv4(),
    name: data.name,
    user: {
      connect: [...data.users],
    },
  });
  return room;
};

module.exports = { create };
