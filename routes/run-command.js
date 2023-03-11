import express from 'express'
import getTutorial from '../index.js'


const router = express.Router();

router.get('/', async (req, res) => {
    // Code to run your command goes here
    const newTutorial = await getTutorial();
    console.log(newTutorial)
    res.write(newTutorial);
    res.write('Command executed successfully!')
    res.send();
});

export default router