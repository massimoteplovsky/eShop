const {Router} = require("express");
const asyncHandler = require('express-async-handler');
const {auth, admin} = require("../middlewares");
const {UserService} = require("../services");
const {
  generateToken,
  createError,
  validateFormByFields,
  insertFieldError
} = require("../helpers");
const {
  loginFormFieldsRules,
  registrationFormFieldsRules,
  updateUserFormFieldsRules
} = require("../form-validator");
const {HttpCode} = require("../consts");

const usersRouter = new Router();
const userService = new UserService();

// @desc   Fetch all users
// @route  GET /api/users
// @access Private/Admin
usersRouter.get("/", auth, admin, asyncHandler( async (req, res, next) => {
  const users = await userService.fetchAllUsers();
  return res.status(HttpCode.SUCCESS).json(users);
}));

// @desc   Remove user
// @route  DELETE /api/users/:userID
// @access Private/Admin
usersRouter.delete("/:userID", auth, admin, asyncHandler( async (req, res, next) => {
  const {userID} = req.params;

  const user = await userService.findUserById(userID);

  if (!user) {
    throw createError(HttpCode.NOT_FOUND, "User not found");
  }

  await userService.removeUser(userID);
  return res.send(HttpCode.SUCCESS);
}));

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
usersRouter.post("/register", ...registrationFormFieldsRules, asyncHandler( async (req, res, next) => {
  const userData = req.body;
  let fieldsErrors = validateFormByFields(req);

  if (Object.keys(fieldsErrors).length > 0) {
    throw createError(HttpCode.BAD_REQUEST, "Wrong registration data", fieldsErrors);
  }

  const user = await userService.findUser(userData.email);

  if (user) {
    fieldsErrors = insertFieldError(fieldsErrors, {email: "User with this email already exists"});
    throw createError(HttpCode.BAD_REQUEST, "Wrong registration data", fieldsErrors);
  }

  await userService.createUser(userData);

  return res.send(HttpCode.SUCCESS);
}));

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
usersRouter.post("/login", ...loginFormFieldsRules, asyncHandler( async (req, res, next) => {
  const {email, password} = req.body;
  let fieldsErrors = validateFormByFields(req);

  if (Object.keys(fieldsErrors).length > 0) {
    throw createError(HttpCode.BAD_REQUEST, "Wrong email or password", fieldsErrors);
  }

  const user = await userService.findUser(email);

  if (!user) {
    fieldsErrors = insertFieldError(fieldsErrors, {email: "User with this email not found"});
    throw createError(HttpCode.BAD_REQUEST, "Wrong form data", fieldsErrors);
  }

  if (!await user.matchUserPassword(password)) {
    fieldsErrors = insertFieldError(fieldsErrors, {password: "Wrong password"});
    throw createError(HttpCode.BAD_REQUEST, "Wrong form data", fieldsErrors);
  }

  const token = generateToken(user._id);

  return res.cookie(`auth-token`, token).status(HttpCode.SUCCESS).json({
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    isAdmin: user.isAdmin,
    isAuth: true,
    city: user.city,
    country: user.country,
    postalCode: user.postalCode,
    address: user.address
  });
}));

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
usersRouter.put("/profile", auth, ...updateUserFormFieldsRules, asyncHandler( async (req, res, next) => {
  const user = req.user;
  const userData = req.body;
  let fieldsErrors = validateFormByFields(req);

  if (Object.keys(fieldsErrors).length > 0) {
    throw createError(HttpCode.BAD_REQUEST, "Wrong form data", fieldsErrors);
  }

  const isEmailTaken = await userService.findUser(userData.email);

  if (isEmailTaken && user.email !== userData.email) {
    fieldsErrors = insertFieldError(fieldsErrors, {email: "User with this email already exists"});
    throw createError(HttpCode.BAD_REQUEST, "Wrong form data", fieldsErrors);
  }

  const updatedUser = await userService.updateUser(user, userData);

  return res.status(HttpCode.SUCCESS).json(updatedUser);
}));

// @desc   Logout user
// @route  GET /api/users/logout
// @access Private
usersRouter.get("/logout", asyncHandler( async (req, res, next) => {
  res.clearCookie("auth-token");
  return res.send(HttpCode.SUCCESS);
}));


// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
usersRouter.get("/auth", auth, asyncHandler( async (req, res, next) => {
  const {user} = req;

  return res.status(HttpCode.SUCCESS).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    city: user.city,
    country: user.country,
    postalCode: user.postalCode,
    address: user.address
  });
}));




module.exports = usersRouter;
