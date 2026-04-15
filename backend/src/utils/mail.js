import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  host: config.NODEMAILER_HOST,
  port: config.NODEMAILER_PORT,
  auth: {
    user: config.NODEMAILER_USER,
    pass: config.NODEMAILER_PASS,
  },
});

export const sendMail = async (userEmail, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"Example Team" <team@example.com>', // sender address
      to: userEmail, // list of recipients
      subject: subject, // subject line
      html: html, // HTML body
    });
  } catch (error) {
    console.log("Something went wrong in send mail", error.message);
  }
};
