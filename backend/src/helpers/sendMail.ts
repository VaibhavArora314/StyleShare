// import nodemailer from 'nodemailer';
// @ts-nocheck
import nodemailer from "nodemailer";
// nodemailer = require('nodemailer');

export const sendVerificationEmail = async (email: string, otp: number) => {
    console.log("Email: ",process.env.EMAIL_USER, process.env.EMAIL_PASS)
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Your App" <yourapp@example.com>',
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is ${otp}`,
  });

  console.log("Message sent: %s", info.messageId);
};
