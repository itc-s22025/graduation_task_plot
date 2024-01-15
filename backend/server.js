const express = require('express');
const app = express();
//cors
const cors = require('cors');
const port = 3002;

const Data = {
    message: 'hello, this is message...'
}

const People = {
    people: ["john", "emma"]
}

const User = {
    user: [{
    id: "user1",
    name: 'Creola Katherine Johnson',
    imageId: 'MK3eW3A'
}, {
    id: "user2",
    name: 'Mario José Molina-Pasquel Henríquez',
    imageId: 'mynHUSa'
}]
}


app.use(cors());

app.get("/", (req, res, next) => {
    res.send("HELLO, THIS IS ROOT PAGE OF BACKEND!");
});

app.get("/api/data", (req, res, next) => {
    res.json(Data);
});

app.get("/api/home", (req, res, next) => {
    res.json(People)
})

app.get("/api/user", (req, res, next) => {
    res.json(User)
})

app.listen(port, () => {
    console.log(`サーバーを${port}で起動したよーーーん`);
});