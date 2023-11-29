const otpGenerator = require("otp-generator");
const { Otp } = require("../../models/otp");
const { userLogin } = require("../../models/userlogin");

exports.sendOTP = async (req, res) => {
  try {
    //const { email } = req.body;
    // Check if user is already present
    console.log("giii");
    console.log(req.query);
    let id = req.query.id;
    let email = "";
    await userLogin.findOne({ where: { id: req.query.id } }).then((res) => {
      email = res.dataValues.email;
    });
    const checkUserPresent = await userLogin.findOne({
      where: { email: email },
    });
    // If user found with provided email
    // if (checkUserPresent) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "User is already registered",
    //   });
    // }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await Otp.findOne({ where: { otp: otp } });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
