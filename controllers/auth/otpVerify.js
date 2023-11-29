const { userLogin } = require("../../models/userlogin");
const { Otp } = require("../../models/otp");

const otpVerify = async (req, res) => {
  try {
    console.log("kiiii");
    console.log(req.query);
    let user = "";
    await userLogin.findOne({ where: { id: req.query.id } }).then((res) => {
      user = res.dataValues;
    });
    console.log(user);
    const response = await Otp.findAll({
      where: { email: user.email },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    if (response.length === 0 || req.body.otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else {
      return res.status(200).json({
        message: "Login success",
        admin: user.admin,
        id: user.id,
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = otpVerify;
