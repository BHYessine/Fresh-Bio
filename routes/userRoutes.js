const {
  Register,
  Login,
  AllUser,
  getUser,
  editUser,
  deleteUser,
  deleteOrder,
  editStatus,
  Forgot,
  NewPsw,
  sendContact,
  sendNewsLetter,
} = require("../controllers/userControllers");
const express = require("express");
const isAuth = require("../middleware/isAuth");
const routesUsers = express.Router();
const {
  registerValidator,
  loginValidator,
  validation,
  forgotValidator,
  newPswValidator,
  sendContactValidator,
  sendNewsLetterValidator,
} = require("../middleware/userValidator");
//Register
routesUsers.post("/register", registerValidator(), validation, Register);

//Login
routesUsers.post("/login", loginValidator(), validation, Login);

//Current
routesUsers.get("/current", isAuth, (req, res) => {
  res.send({ message: "authorized", user: req.user });
});
//Forgot Password
routesUsers.post("/forgot", forgotValidator(), validation, Forgot);
//New Password
routesUsers.post("/newpsw/:token", newPswValidator(), validation, NewPsw);
//Send Contact Message
routesUsers.post(
  "/sendmessage",
  sendContactValidator(),
  validation,
  sendContact
);
//Send NewsLetter
routesUsers.post(
  "/newsletter",
  sendNewsLetterValidator(),
  validation,
  sendNewsLetter
);
routesUsers.get("/allusers", AllUser);
routesUsers.get("/user/:id", getUser);
routesUsers.put("/edituser/:id", editUser);
routesUsers.put("/editstatus/:id", editStatus);
routesUsers.delete("/deleteuser/:id", deleteUser);

module.exports = routesUsers;
