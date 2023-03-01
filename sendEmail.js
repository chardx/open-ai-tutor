import { transporter, mailOptions } from "./nodemailer.js";

export const sendEmail = async (generatedTutorial, keyword) => {
    await transporter.sendMail({
        ...mailOptions,
        subject: "Tutorial for " + generatedTutorial,
        text: generatedTutorial,
        html: "<h1> Test Title </h1><p>Some body text</p>",
    })
}