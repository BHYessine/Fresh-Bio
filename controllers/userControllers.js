const users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 465,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PSW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
//Register
const saltRounds = 10;
exports.Register = async (req, res) => {
  try {
    const { email, password_1 } = req.body;
    const findUser = await users.findOne({ email });
    if (findUser) {
      return res.status(400).send({ message: "Email is used" });
    }
    const newUser = new users({ ...req.body });
    if (newUser.password_1 === newUser.password_2) {
      const hashedPsw_1 = await bcrypt.hash(password_1, saltRounds);
      newUser.password_1 = hashedPsw_1;
      newUser.password_2 = hashedPsw_1;
      await newUser.save();
    } else {
      res.status(400).send({ message: "Password doesn't match" });
    }
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .send({ message: "Account created successfully", newUser, token });
    await transporter.sendMail({
      to: `"Fresh Bio Contact" <${process.env.USER_EMAIL}>`,
      subject: "New User",
      html: `      
      <h5>New User added to your Customer List </h5>
      <ul>
        <li>${newUser.name}</li>
        <li>${newUser.email}</li>
        <li>${newUser.phone}</li>
        <li>${newUser.address}</li>
      </ul>
      `,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Login
exports.Login = async (req, res) => {
  try {
    const { email, password_1 } = req.body;

    const findUser = await users.findOne({ email });

    if (!findUser) {
      return res.status(400).send({ message: "Bad credentials" });
    }
    const comparePsw = await bcrypt.compare(password_1, findUser.password_1);

    if (!comparePsw) {
      return res.status(400).send({ message: "Bad credentials" });
    }
    const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).send({ findUser, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Forgot Password
exports.Forgot = async (req, res) => {
  try {
    const findUser = await users.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(400).send({ message: "Email not exist" });
    }

    const token = crypto.randomBytes(64).toString("hex");
    findUser.resetToken = token;
    findUser.expireToken = Date.now() + 5400000;
    findUser.save();
    await transporter.sendMail({
      from: `"Fresh Bio Contact" <${process.env.USER_EMAIL}>`,
      to: findUser.email,
      subject: "reset password",
      html: `<h5>Click <a href="https://fresh-bio.herokuapp.com/newpsw/${token}">here</a> to reset</h5>`,
    });
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).send({
      message: "Link sent successfully. Check your Email please.",
      findUser,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//New Password
exports.NewPsw = async (req, res) => {
  try {
    const findUser = await users.findOne({
      resetToken: req.params.token,
      expireToken: { $gt: Date.now() },
    });
    const { password_1, password_2 } = req.body;

    if (!findUser) {
      return res.status(422).send({ message: "Session Expired, Try again" });
    }
    if (password_1 != password_2) {
      return res.status(400).send({ message: "Password doesn't match" });
    }

    const hashedPsw = await bcrypt.hash(password_1, saltRounds);
    findUser.password_1 = hashedPsw;
    findUser.password_2 = hashedPsw;
    findUser.updatedAt = Date.now();
    await findUser.save();
    res.status(200).send({ message: "Password updated success", findUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//ALL USERS
exports.AllUser = async (req, res) => {
  try {
    const allUsers = await users.find({ type: "customer" });
    res.status(200).send({ allUsers });
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET USER
exports.getUser = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

//UPDATE USER ORDERS
exports.editUser = async (req, res) => {
  try {
    const editUser = await users.updateOne(
      { _id: req.params.id },
      {
        updatedAt: Date.now(),
        $push: {
          orders: {
            products: req.body.products,
            sum: req.body.sum,
          },
        },
      }
    );
    const findUser = await users.findById(req.params.id);
    await transporter.sendMail({
      from: `"Fresh Bio Contact" <${process.env.USER_EMAIL}>`,
      to: `${findUser.name} <${findUser.email}>`,
      subject: "Your order has been placed.",
      html: `      
      <h4> Dear ${findUser.name},</h4>
      <p>
      Thank you for shopping on Fresh Bio! Your order has been placed successfully.<br>
      It will be packaged and shipped as soon as possible.<br>
      You will receive notification from us as soon as the item(s) is(are) ready for delivery.<br>
      Thank you for shopping on Fresh Bio.
      </p>      
      `,
    });
    res
      .status(200)
      .send({ message: "Order has been sent successfully.", findUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

//DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await users.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).send(err);
  }
};

//UPDATE USER PURCHASES STATUS
exports.editStatus = async (req, res) => {
  try {
    const editOrder = await users.updateOne(
      {
        _id: req.params.id,
        "orders._id": req.body,
      },
      {
        $set: { "orders.$.status": true, "orders.$.updatedAt": Date.now() },
      }
    );
    const findUser = await users.findById(req.params.id);
    await transporter.sendMail({
      from: `"Fresh Bio Contact" <${process.env.USER_EMAIL}>`,
      to: `${findUser.name} <${findUser.email}>`,
      subject: "Your package will be delivered to you today!",
      html: `      
      <h4> Dear ${findUser.name},</h4>
      <p>
      Your order will be delivered today. You will be contacted by our delivery person to schedule the delivery of your order.<br>
      Thank you for shopping on Fresh Bio. 
      </p>         
      `,
    });
    res
      .status(200)
      .send({ message: "Order validated successfully.", findUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

//SEND CONTACT EMAIL
exports.sendContact = async (req, res) => {
  try {
    const { email, subject, name, message } = req.body;
    await transporter.sendMail({
      to: `"Fresh Bio Contact" <${process.env.USER_EMAIL}>`,
      subject: "New message",
      html: `      
      <p>You have a new message from: <h4>${name} ${email}</h4> </p> 
      <p>Subject: <br> ${subject} </p>
      <p>Message: <br> ${message} </p>       
      `,
    });
    res.status(200).send({ message: "Message has been sent successfully " });
  } catch (err) {
    res.status(500).send(err);
  }
};
//SEND NEWSLETTER
exports.sendNewsLetter = async (req, res) => {
  try {
    const mails = await users.distinct("email");
    const { subject, message } = req.body;
    await transporter.sendMail({
      to: mails,
      subject: subject,
      html: `            
      <p>${message} </p>       
      `,
    });
    res.status(200).send({ message: "NEWSLETTER has been sent successfully " });
  } catch (err) {
    res.status(500).send(err);
  }
};
