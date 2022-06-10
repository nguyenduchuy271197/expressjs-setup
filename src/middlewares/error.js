const httpStatus = require("http-status");
const { env } = require("../config/config");
const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(env === "development" && { stack: err.stack }),
  };

  if (env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
