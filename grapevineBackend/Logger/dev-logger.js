const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, colorize } = format;

const devLogger = () => {
  const customLoggerFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}  ${level}: ${message}`;
  });

  return createLogger({
    level: "debug",
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      customLoggerFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
};

module.exports = devLogger();
