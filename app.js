const express = require("express")
const app = express();
const axios = require('axios')

const openaiApiKey = process.env.openaiApiKey



app.get('/', function (req, res) {
    res.write("<h1> Welcome to my open-ai Tutor API </h1>")
    res.write(openaiApiKey)
    res.send();
})

const getTutorial = async () => {
    const { data: response } = await axios.post(
        "https://api.openai.com/v1/completions",
        {
            model: "text-davinci-003",
            prompt: 'Ask a Random question about React and answer in best explanation',
            max_tokens: 70,
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

    const comment = response.choices[0].text;
    console.log(comment);

}
// Delay each iteration for 30min
setInterval(getTutorial, 1 * 60 * 1000);
getTutorial();

app.listen(3000, function () {
    console.log("Listening to 3000")
})
