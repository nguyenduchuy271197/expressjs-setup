const winston = require("winston");
const { env, logtailToken } = require("./config");
const { combine, timestamp, json, colorize, uncolorize, align, splat } =
  winston.format;
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

const logtail = new Logtail(logtailToken);

const logger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    // new LogtailTransport(logtail)
  ],
});

module.exports = logger;
