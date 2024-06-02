import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (email: string, username: string) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Style Share" <yourapp@example.com>',
    to: email,
    subject: "Welcome to Style Share!",
    text: `Welcome to Style Share, ${username}!`,
    html: getWelcomeMailBody(username),
  });
};

const getWelcomeMailBody = (username: string) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Style Share</title>
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
                  .footer {
                      text-align: center;
                      color: #888888;
                      font-size: 12px;
                      margin-top: 20px;
                  }
                  .reset-link {
                      color: #4CAF50;
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Welcome to Style Share!</h1>
                  </div>
                  <div class="content">
                      <p>Hello ${username},</p>
                      <p>Thank you for signing up for Style Share. We are excited to have you on board!</p>
                      <p>If this account does not belong to you, please <a class="reset-link" href="https://yourapp.example.com/reset-password">reset your password</a> immediately from our website.</p>
                  </div>
                  <div class="footer">
                      <p>If you created this account, please verify this email in profile section.</p>
                      <p>Thank you!</p>
                  </div>
              </div>
          </body>
      </html>
      `;
};

export default getWelcomeMailBody;
