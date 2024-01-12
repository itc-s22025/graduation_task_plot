const express = require('express');
const app = express();
//cors
const cors = require('cors');
const port = 3002;

const Data = {
    message: 'hello, this is message...'
}


app.use(cors());

app.get("/", (req, res, next) => {
    res.send("HELLO, THIS IS ROOT PAGE OF BACKEND!");
});

app.get("/api/data", (req, res, next) => {
    res.json(Data);
});

app.listen(port, () => {
    console.log(`サーバーを${port}で起動したよーーーん`);
});