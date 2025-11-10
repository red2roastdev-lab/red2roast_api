import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MC_SMTP_HOST,
    port: process.env.MC_SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.MC_EMAIL_USER,
        pass: process.env.MC_EMAIL_PASS,
    },
});

export default transporter;