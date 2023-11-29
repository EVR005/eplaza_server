const express = require("express");
const otpController = require("../controllers/auth/otpController");
const otpVerify = require("../controllers/auth/otpVerify");
const router = express.Router();
router.post("/send-otp", otpController.sendOTP);

router.post("/verifyotp", otpVerify);
module.exports = router;
