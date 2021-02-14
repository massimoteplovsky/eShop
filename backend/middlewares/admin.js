const {HttpCode} = require("../consts");
const {createError} = require("../helpers");

const admin = (req, res, next) => {
  const {user} = req;

  if (user && user.isAdmin) {
    return next();
  }

  throw createError(HttpCode.UNAUTHORIZED, "Access not allowed. Admin only!");
};

module.exports = admin;
