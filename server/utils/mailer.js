const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = {
  sendMail: async (to, subject, html) => {
    try {
      const info = await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
      return info;
    } catch (err) {
      console.error('Email send error', err);
      throw err;
    }
  }
};
