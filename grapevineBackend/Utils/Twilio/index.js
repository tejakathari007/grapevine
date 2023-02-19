const twilio = require("twilio");
const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sendSms = async (number, sms) => {
  try {
    const response = await twilioClient.messages.create({
      body: sms,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: number,
    });
    console.log(response, "response");
    return response;
  } catch (err) {
    throw Error(err.messages);
  }
};

module.exports = { sendSms };
