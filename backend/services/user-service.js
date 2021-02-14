const mongoose = require("mongoose");
const {Users} = require("../models");

class UserService {

  async fetchAllUsers() {
    return await Users.find({});
  }

  async findUser(email) {
    return await Users.findOne({email});
  }

  async updateUser(user, userData) {
    user.firstname = userData.firstname;
    user.lastname = userData.lastname;
    user.email = userData.email;
    if (userData.password) {
      user.password = userData.password;
    }
    user.city = userData.city,
    user.country = userData.country,
    user.address = userData.address,
    user.postalCode = userData.postalCode
    user.save();
    return user;
  }

  async findUserById(userID) {
    return await Users.findUserById(userID);
  }

  async createUser(userData) {
    return await Users.create(userData);
  }

  async removeUser(userID) {
    return await Users.deleteOne({_id: userID});
  }
}

module.exports = UserService;

