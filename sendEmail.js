import { transporter, mailOptions } from "./nodemailer.js";

export const sendEmail = async (generatedTutorial, keyword, category) => {
    await transporter.sendMail({
        ...mailOptions,
        subject: `${category} about ${keyword}`,
        text: generatedTutorial,
        html: `<h3> ${category} </h3> <p>${generatedTutorial}</p>`,
    })
}

