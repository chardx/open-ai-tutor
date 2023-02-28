const express = require("express")
const app = express();

app.get('/', function (req, res) {
    res.write("<h1> Richard </h1>")
    res.send();
})

app.listen(3000, function () {
    console.log("Listening to 3000")
})
console.log("hello")