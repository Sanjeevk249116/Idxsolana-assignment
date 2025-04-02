require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: `"Sanjeev Kushwaha"`,
});



if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("ERROR: EMAIL_USER or EMAIL_PASS not set in .env file");
  process.exit(1);
}

/**
 * Send an email using Nodemailer
 * @param {Object} mailOptions - The email options (e.g., to, subject, text, html, etc.)
 * @returns {Promise} - Resolves when the email is sent, rejects if there's an error
 */
const sendMailToUser = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

module.exports = { sendMailToUser };
