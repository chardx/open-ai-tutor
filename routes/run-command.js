import express from 'express'
import { getTutorial } from '../index.js'

const app = express();

app.get('/', (req, res) => {
    // Code to run your command goes here
    const newTutorial = getTutorial();
    console.log(newTutorial)
    res.send('Command executed successfully');
});

export default app