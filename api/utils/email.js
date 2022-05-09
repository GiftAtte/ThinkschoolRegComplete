const nodemailer = require("nodemailer");
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    driver: process.env.EMAIL_DRIVER,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
          rejectUnauthorized: false
      }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.message,
    //   attachments: [
    //     {
    //       // utf-8 string as an attachment
    //       path: path,
    //     },
    //   ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
