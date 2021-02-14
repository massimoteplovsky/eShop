const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");

const generateToken = (userID) => {
  return jwt.sign({userID}, process.env.TOKEN_SECRET, { expiresIn: "30d" });
}

const createError = (status, message, errorData = null) => {
  const error = new Error(message);
  error.status = status;
  error.errorData = errorData;
  return error;
}
const validateFormByFields = (req) => {
  const mappedErrors = validationResult(req).mapped();
  const formattedErrors = Object.keys(mappedErrors).reduce((acc, field) => {
    acc[field] = mappedErrors[field]["msg"];
    return acc;
  }, {});

  return formattedErrors;
}

const insertFieldError = (errors, field) => {
  return {...errors, ...field};
}

module.exports = {
  generateToken,
  createError,
  validateFormByFields,
  insertFieldError
}
