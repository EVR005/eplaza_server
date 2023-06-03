const userLogin = require("../models/userlogin");
var logger = require("../utils/log")(module);

const express = require("express");
const router = express.Router();
// const Login = require("../controllers/auth/login");
const auth = require("../controllers/auth");
const authValidator = require("../validators/authValidator");
const { validate } = require("../validators/index");

router.post("/login", authValidator.loginValidator, validate, auth.login);

router.post(
  "/signup",
  authValidator.SetPasswordValidator,
  validate,
  auth.signup
);

// router.get("/test", (req, res) => {
//   userLogin
//     .findAll()
//     .then((users) => {
//       console.log(users);
//       res.send(users);
//     })
//     .catch((err) => {
//       console.error("Error finding users", err);
//     });
// });

module.exports = router;
