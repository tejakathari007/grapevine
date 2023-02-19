const { chat } = require("@subscriptions");

const getChats = async (room_id) => {
  return await chat.get({
    where: {
      room_uuid: room_id,
    },
  });
};

module.exports = { getChats };
