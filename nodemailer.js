import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
dotenv.config();

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: email,
        pass
    }
});

export const mailOptions = {
    from: email,
    to: email,

}

