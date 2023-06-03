const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { userLogin } = require("../../models/userlogin");

const { jwtDetails } = require("../../config/config");

var logger = require("../../utils/log")(module);

const Login = async (req, res) => {
  try {
    //implement login functionalities
    // console.log("hi");
    // console.log(req.body);
    const data = await userLogin.findOne({
      where: { username: req.body.username },
    });
    // console.log("hi");
    // console.log(data);
    //fetch from database table
    const password = req.body.password;

    if (data) {
      // if (!data.iscreated)
      //   return res.status(400).send({ message: "User not created!" });
      console.log("Hello2 ", data.dataValues.password);

      console.log(password + " " + data.dataValues.password);
      await bcrypt.compare(
        password,
        data.dataValues.password,
        async function (err, result) {
          if (err) {
            return res.status(500).send({ message: "Server Error" });
          } else {
            console.log("Hello", result);
            if (result === true) {
              const tokenData = { role: "Role", id: data.dataValues.id }; //set token data as per your logic

              let token = jwt.sign(tokenData, jwtDetails.secret, {
                expiresIn: jwtDetails.jwtExpiration,
              });

              return res.status(200).json({
                message: "Login success",
                accessToken: token,
                admin: data.admin,
                id: data.id,
              });
            } else {
              return res
                .status(400)
                .send({ message: { Password: "Wrong Password" } });
            }
          }
        }
      );
    } else {
      return res.status(400).send({ message: "User not Found" });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

module.exports = Login;
