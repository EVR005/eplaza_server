//const mongoose = require("mongoose");
const { sequelize } = require("../connection/db_connect");
const Sequelize = require("sequelize");
const { Op, literal, col, fn } = require("sequelize");
const { DataTypes, BOOLEAN } = require("sequelize");
const mailSender = require("../utils/mailSender");

const Otp = sequelize.define("otp", {
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  otp: {
    type: DataTypes.STRING,
    required: true,
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   default: Date.now,
  //   //expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  // },
  // expiresAt: {
  //   type: DataTypes.DATE,
  //   defaultValue: Sequelize.literal("DATE_ADD(NOW(), INTERVAL 3 MINUTE)"),
  // },
});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  console.log("emmmm : ", email);
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

const removeExpiredOTPs = async () => {
  try {
    const now = new Date();
    const someValue = 180;
    // Find and delete expired OTPs
    await Otp.destroy({
      where: literal(`"createdAt" + INTERVAL '${someValue} seconds' < NOW()`),
    });
    console.log("Expired OTPs removed.");
  } catch (error) {
    console.error("Error removing expired OTPs:", error);
  }
};

Otp.beforeCreate("save", async (otp) => {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  console.log("jiiii");
  setTimeout(removeExpiredOTPs, 300000);
  await sendVerificationEmail(otp.email, otp.otp);
  //   next();
});

// Otp.addHook("beforeUpdate", "beforeDestroy", (instance, options) => {
//   const now = new Date();
//   if (instance.createdAt && instance.createdAt + 300000 < now) {
//     // The record has expired, perform the necessary actions
//     // For example, you might want to delete the record
//     return Otp.destroy({ where: { id: instance.id } });
//   }
//   // If the record has not expired, continue with the operation
// });
module.exports = { Otp };
