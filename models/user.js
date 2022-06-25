const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },

  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password_1: {
    type: String,
    required: true,
  },
  password_2: {
    type: String,
    required: true,
  },
  resetToken: String,
  expireToken: Date,

  type: {
    type: String,
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  orders: [
    {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
      products: [],
      status: {
        type: Boolean,
        default: false,
      },
      sum: {
        type: Number,
      },
    },
  ],
});

module.exports = Users = model("Users", userSchema);
