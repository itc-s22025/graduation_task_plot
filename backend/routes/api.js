const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const prisma = new PrismaClient();
// ログインしてるか　してなかったら他のデータ取れない
router.use((req, res, next) => {
    if (!req.user){
        res.status(400).json({message: "ログインしてないです"});
        return
    }
    next();
})
router.get("/check", (req, res, next) => {
    res.json({message: "ログインできたよ", result: req.user});
});
// ここまで
//userデータ取得
router.get("/user", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +req.user.id
            },
            include: {
                post: true
            }
        });
        res.json({user})
    }catch (e) {
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }
})
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

router.put('/updateProfile', require('../pages/api/updateProfile'));


module.exports = router;