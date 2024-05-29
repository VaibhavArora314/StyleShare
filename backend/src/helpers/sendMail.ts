// import nodemailer from 'nodemailer';
// @ts-nocheck
import nodemailer from "nodemailer";
// nodemailer = require('nodemailer');

export const sendVerificationEmail = async (email: string, otp: number) => {
  console.log("Email: ", process.env.EMAIL_USER, process.env.EMAIL_PASS)
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Style Share" <yourapp@example.com>',
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is ${otp}`,
    // This html is a simple html template for the email body
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            margin: 20px 0;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
            color: #4CAF50;
        }
        .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>OTP Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up. To complete your registration, please use the following OTP (One Time Password) to verify your email address:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        </div>
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you!</p>
        </div>
    </div>
</body>
</html>

    `
  });

  console.log("Message sent: %s", info.messageId);
};
