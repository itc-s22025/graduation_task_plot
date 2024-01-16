const express = require('express');
const app = express();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//cors
const cors = require('cors');
const port = 3002;


const Data = {
    message: 'hello, this is message...'
}

const usersRouter = require('./router/users');

app.use(cors());


//users
app.use("/api", usersRouter);


app.get("/", (req, res, next) => {
    res.send("HELLO, THIS IS ROOT PAGE OF BACKEND!");
});

app.get("/api/data", (req, res, next) => {
    res.json(Data);
});

//prismaからデータとれてるかテスト用
app.get("/test", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({msg: error.msg});
    }
})

//get user by id
app.get("/user/:id", async (req, res, next) =>{
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({msg:error.msg});
    }
})

app.listen(port, () => {
    console.log(`サーバーを${port}で起動したよーーーん`);
});