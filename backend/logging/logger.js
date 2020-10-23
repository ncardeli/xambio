const appRoot = require("app-root-path");
const winston = require("winston");
const { combine, timestamp, prettyPrint } = winston.format;

const LOG_FILE_PATH = `${appRoot}/logs/app.log`;

const options = {
  file: {
    level: "info",
    filename: LOG_FILE_PATH,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: (message, encoding) => logger.info(message)
};

module.exports = logger;
