const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {check, validationResult} = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

// ログインしてるか　してなかったら他のデータ取れない
router.use((req, res, next) => {
    if (!req.user) {
        res.status(400).json({message: "ログインしてないですけど"});
        return
    }
    next();
})
router.get("/check", (req, res, next) => {
    res.json({message: "ログインできたよ", result: req.user});
});
// ここまで


//直近データ取得
router.get("/all", async (req, res, next) => {
    try {
        const latestPosts = await prisma.post.findMany({
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                user: true
            },
            // take: 5,
        });
        res.json({latestPosts});
        console.log(latestPosts)
    } catch (e) {
        next(error)
    } finally {
        await prisma.$disconnect();
    }
});

router.post("/create", [
    check("text").notEmpty()
], async (req, res, next) => {
    const isValid = validationResult(req).isEmpty()
    if (!isValid) {
        res.status(400).json({message: "何か入力して〜;_;"});
        return
    }
    const {text} = req.body;
    await prisma.post.create({
        data: {
            text,
            userId: +req.user.id
        }
    });
    res.status(201).json({message: "createできたよ〜"})
})

//表示　とりあえず
router.get("/create", async (req, res, next) => {
    try {
        const users = await prisma.post.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
})
module.exports = router;