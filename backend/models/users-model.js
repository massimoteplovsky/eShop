const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema, model} = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  city: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  postalCode: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
  if (this.isModified(`password`)) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    next();
  }
});

userSchema.methods.matchUserPassword = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password);
}

userSchema.statics.findUserById = async function(userID) {
  return await this.findById(userID).select("-password");
}

const Users = model(`Users`, userSchema);

module.exports = Users;
