const { check, validationResult } = require("express-validator");

exports.registerValidator = () => [
  check("name", "Name is required").notEmpty(),
  check("phone", "Phone is required").notEmpty(),
  check("address", "Address is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("password_1", "Password is required").notEmpty(),
  check("password_2", "Confirm Password is required").notEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password_1", "Password must be at least 6 digits").isLength({
    min: 6,
  }),
  check("phone", "Enter a valid phone number").isLength({ min: 8 }),
];

exports.loginValidator = () => [
  check("email", "Email is required").notEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password_1", "Password is required").notEmpty(),
];

exports.forgotValidator = () => [
  check("email", "Email is required").notEmpty(),
  check("email", "Enter a valid email").isEmail(),
];

exports.newPswValidator = () => [
  check("password_1", "Password is required").notEmpty(),
  check("password_2", "Confirm Password is required").notEmpty(),
  check("password_1", "Password must be at least 6 characters.").isLength({
    min: 6,
  }),
];

exports.sendContactValidator = () => [
  check("subject", "Subject is required").notEmpty(),
  check("name", "Full Name is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("message", "Message is required").notEmpty(),
];

exports.sendNewsLetterValidator = () => [
  check("subject", "Subject is required").notEmpty(),
  check("message", "Message is required").notEmpty(),
];

exports.validation = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  next();
};
