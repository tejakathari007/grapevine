const nodemailer = require("nodemailer");

const transporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
};

module.exports = transporter;
