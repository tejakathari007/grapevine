const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, errors, json } = format;

const prodLogger = () => {
  return createLogger({
    level: "info",
    format: combine(colorize(), timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [
      new transports.File({ filename: "error_prod.log", level: "error" }),
      new transports.File({ filename: "warning_prod.log", level: "warn" }),
      new transports.Console(),
    ],
  });
};

module.exports = prodLogger();
