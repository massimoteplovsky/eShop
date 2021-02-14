const {HttpCode} = require("../consts");

const SERVER_ERROR_MESSAGE = "Internal server error";

const serverErrorHandler = (err, req, res, next) => {
  const statusCode = !err.status ? HttpCode.INTERNAL_SERVER_ERROR : err.status;
  console.log(err, res.statusCode, "server error handler");

  return res.status(statusCode).json({
    message: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? SERVER_ERROR_MESSAGE : err.message,
    status: statusCode,
    data: err.errorData ? err.errorData : null,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
}

module.exports = serverErrorHandler;
