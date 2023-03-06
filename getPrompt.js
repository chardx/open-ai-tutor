export function getPrompt() {
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
            type: 'Tailwind CSSS Tip of the Day', description: `Provide a random Tailwind CSS code line and provide it's code equivalent for CSS. I also want the response to enclose it with html proper tagging and add style.`
        },
        {
            type: 'Javascript Coding problem', description: `Provide a random leet code problem and show your solutions in Javascript with explanation. I also want the response to enclose it with html proper tagging and add style.`
        },]

    const categoryIndex = Math.floor(Math.random() * categories.length);

    const prompt = categories[categoryIndex].description
    const category = categories[categoryIndex].type

    return [keyword, prompt, category];
}