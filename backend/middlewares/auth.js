const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {Users} = require("../models");
const {HttpCode} = require("../consts");
const {createError} = require("../helpers");

const auth = asyncHandler(async (req, res, next) => {
  let token = req.cookies["auth-token"];

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await Users.findUserById(decodedToken.userID);

      if (!user) {
        throw createError(HttpCode.UNAUTHORIZED, "User not found");
      }

      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      throw createError(HttpCode.UNAUTHORIZED, "Not authorized, invalid user token");
    }
  }

  throw createError(HttpCode.UNAUTHORIZED, "Not authorized, no token");
});

module.exports = auth;
