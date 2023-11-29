const express = require("express");
const otpController = require("../controllers/auth/otpController");
const otpVerify = require("../controllers/auth/otpVerify");
const router = express.Router();
router.post("/signup-otp", otpController.sendOTP);
router.post("/verifysignupotp", otpVerify);
module.exports = router;
