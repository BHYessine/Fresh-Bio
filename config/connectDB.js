const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB is connected...");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
