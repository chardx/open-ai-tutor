
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



function getPrompt() {
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
    const keyword = keywords[index];

    const categories = [
        {

            type: 'Interview question',
            description: `Act as Interviewer for Web Developer position 
                and ask advance question about ${keyword} and 
                provide your answer in the best answer possible.
                 Please provide code examples if applicable. 
                 I also want the response to enclose it with html 
                 proper tagging and style`},
        {
            type: 'Behavioural question', description: `Act as an Interviewer for Web Developer position 
            and ask Behavioural Interview question  then provide  the best answer possible
            in STAR Method format.Please answer in clear and conscise manner. I also want the response to enclose it with html proper tagging and style` },
        {
            type: 'Multiple choice question', description: `Generate an advance question about ${keyword} 
        in 4 multiple choice of answer. Provide the answer below and explanation. 
        I also want the response to enclose it with html proper tagging and add style. ` },
        {
            type: 'CSS Tip of the Day', description: `Hey ChatGPT, can you share with me today's advanced CSS tip?
     I'm eager to learn how to use the latest CSS techniques to create visually stunning designs 
     and improve my web development skills. Whether it's a new way to use CSS animations or a cutting-edge layout technique, I'm ready to take my skills to the next level. 
     So please, share your best CSS tip of the day with me! Please also provide code example`}]

    const categoryIndex = Math.floor(Math.random() * categories.length);

    const prompt = categories[categoryIndex].description
    const category = categories[categoryIndex].type

    return [keyword, prompt, category];
}


const getTutorial = async () => {
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
