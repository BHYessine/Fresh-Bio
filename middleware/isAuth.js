const jwt = require("jsonwebtoken");
const users = require("../models/user");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ message: " You Are Not Authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await users.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(401).send({ message: " You Are Not Authorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: " You Are Not Authorized" });
  }
};

module.exports = isAuth;