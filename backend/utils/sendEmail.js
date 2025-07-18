import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (err) {
    console.log("error" + err);
  }
};
