const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("../mocks/users.js");
const products = require("../mocks/products.js");
const {Users, Products} = require("../models");
const Orders = require("../models/orders-model");
const connectDB = require("./db");

connectDB();

const importData = async () => {
  try {
    await Orders.deleteMany();
    await Users.deleteMany();
    await Products.deleteMany();

    const createdUsers = await Users.insertMany(users);

    const adminUser = createdUsers[2]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser
      }
    });

    await Products.insertMany(sampleProducts);

    console.log("Data imported!".green.inverse);
    process.exit(0);

  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Orders.deleteMany();
    await Users.deleteMany();
    await Products.deleteMany();

    console.log("Data destroyed!".green.inverse);
    process.exit(0);

  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

