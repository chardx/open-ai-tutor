import express from "express"
import home from "./routes/home.js"
import run from "./routes/run-command.js"

import axios from 'axios'
import dotenv from 'dotenv';
import { sendEmail } from './sendEmail.js'
import { getPrompt } from './getPrompt.js'
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/home", home);
app.use("/run", run)
dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY

const port = process.env.PORT || 9001


app.get('/', function (req, res) {
    res.write("<h1> Welcome to my open-ai Tutor API </h1>")
    res.write("Listening to Port " + port)
    res.write("Hi am Richard. This is a test ")
    res.send();
})





export const getTutorial = async () => {
    const [keyword, prompt, category] = getPrompt();
    try {

        const { data: response } = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 500,
                temperature: 0.1,
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
        sendEmail(generatedTutorial, keyword, category);

        return generatedTutorial;
    } catch (error) {
        console.log(error);
    }

}
// Delay each iteration for 30min
setInterval(getTutorial, 2 * 60 * 1000);
const generatedTut = getTutorial();


app.listen(port, () => {
    console.log(`Listening to ${port}`)
})
