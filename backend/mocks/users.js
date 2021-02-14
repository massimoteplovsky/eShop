const bcrypt = require("bcryptjs");

const users = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@gmail.com",
    password: bcrypt.hashSync("qwerty12345", 10),
  },
  {
    firstname: "John",
    lastname: "Doe",
    email: "mark@gmail.com",
    password: bcrypt.hashSync("qwerty12345", 10),
  },
  {
    firstname: "Maksim",
    lastname: "Teplov",
    email: "www.maximalist@mail.ru",
    password: bcrypt.hashSync("qwerty12345", 10),
    isAdmin: true
  },
];

module.exports = users;
