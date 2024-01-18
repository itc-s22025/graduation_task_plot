const express = require('express');
const app = express();
//prisma
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//session
const session = require('express-session');
const passport = require('passport');
//cors
const cors = require('cors');
const port = 3002;


const Data = {
    message: 'hello, this is message...'
}


const People = {
    people: ["john", "emma"]
}


const usersRouter = require('./router/users');

app.use(cors());

//sessionの設定
app.use(session({
    secret: "#vyexY>ycq*C43W9B8T2M8R(",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000}
}));

//passportの全体向け設定
app.use(passport.authenticate("session"));
app.use((req, res, next) => {
    const messages = req.session.messages || [];
    res.locals.messages = messages;
    res.locals.hasMessages = !!messages.length;
    req.session.messages = [];
    next();
});

//users
app.use("/api", usersRouter);


app.get("/", (req, res, next) => {
    res.json({msg:"HELLO, THIS IS ROOT PAGE OF BACKEND!"});
});

app.get("/api/data", (req, res, next) => {
    res.json(Data);
});


//home_post
app.get("/api/home", (req, res, next) => {
    res.json(People)
})


//prismaからデータとれてるかテスト用
    app.get("/test", async (req, res, next) => {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({msg: error.msg});
        }
    })

//get user by id
    app.get("/user/:id", async (req, res, next) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.params.id
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.msg});
        }
    })


    app.listen(port, () => {
        console.log(`サーバーを${port}で起動したよーーーん`);
    });

