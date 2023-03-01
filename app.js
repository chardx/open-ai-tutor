
import express from "express"

import axios from 'axios'
import dotenv from 'dotenv';
import { sendEmail } from './sendEmail.js'

const app = express();
dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY


app.get('/', function (req, res) {
    res.write("<h1> Welcome to my open-ai Tutor API </h1>")
    res.send();
})

function getKeyword() {
    // select random keywords
    const keywords = [
        "reactjs",
        "nextjs",
        "reactjs Hooks",
        "nodejs",
        "javascript",
        "front-end developer",
        "back-end developer",
        "html",
        "css",
    ];

    const index = Math.floor(Math.random() * keywords.length);
    return keywords[index];
}


const getTutorial = async () => {
    const keyword = getKeyword();
    try {

        const { data: response } = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003",
                prompt: `Act as Interviewer for Web Developer position and ask advance question about ${keyword} and provide your answer in the best answer possible`,
                max_tokens: 150,
                temperature: 0.5,
                top_p: 1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openaiApiKey}`,
                },
            }
        );

        const generatedTutorial = response.choices[0].text;
        console.log(generatedTutorial);

        //Send Email
        sendEmail(generatedTutorial, keyword);
    } catch (error) {
        console.log(error);
    }

}
// Delay each iteration for 30min
setInterval(getTutorial, 1 * 60 * 1000);
getTutorial();

app.listen(3000, function () {
    console.log("Listening to 3000")
})
