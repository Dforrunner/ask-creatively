import { Email } from '@/models/Email';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  name: process.env.EMAIL_NAME,
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: Number(process.env.EMAIL_PORT),
  secure: 465,
});

export const sendEmail = (mail: Email) => {
  return transporter.sendMail(mail);
};
