const { body, header, param, query } = require("express-validator");
const { validate } = require("../validators");

const loginValidator = async (req, res, next) => {
  await body("username")
    .notEmpty()
    .withMessage("Username is required!")
    .run(req);
  // await body("email")
  //   .notEmpty()
  //   .withMessage("Email is required!")
  //   .trim()
  //   .isEmail()
  //   .normalizeEmail()
  //   .withMessage("Invalid Email")
  //   .run(req);
  await body("password")
    .notEmpty()
    .withMessage("password not defined in body")
    .run(req);

  next();
};

const SetPasswordValidator = async (req, res, next) => {
  await body("username")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("username length invalid")
    .bail()
    .withMessage("username not defined in body")
    .run(req);
  await body("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password length invalid")
    .bail()
    .withMessage("password not defined in body")
    .run(req);
  await body("confirmpassword")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password length invalid")
    .bail()
    .withMessage("confirm-password not defined in body")
    .bail()
    .run(req);
  await body("email")
    .notEmpty()
    // .isLength({ min: 5 })
    // .withMessage("password length invalid")
    .bail()
    .withMessage("email not defined in body")
    .run(req);
  await body("phone")
    .notEmpty()
    .isLength(10)
    // .withMessage("password length invalid")
    .bail()
    .withMessage("phone not defined in body")
    .run(req);
  //   await body("userId").notEmpty().withMessage("userID not defined").run(req);
  //   await body("linkCode")
  //     .notEmpty()
  //     .withMessage("link code not define in body")
  //     .run(req);

  next();
};
const ForgotPasswordValidator = async (req, res, next) => {
  await body("mail")
    .notEmpty()
    .withMessage("Email is required!")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email")
    .run(req);
  next();
};

module.exports = {
  loginValidator,
  SetPasswordValidator,
  ForgotPasswordValidator,
};
