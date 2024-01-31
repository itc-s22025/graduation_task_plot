const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {check, validationResult} = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

//ログインしてるか　してなかったら他のデータ取れない
// router.use((req, res, next) => {
//     if (!req.user){
//         res.status(400).json({message: "ログインしてないです"});
//         return
//     }
//     next();
// })
// router.get("/check", (req, res, next) => {
//     res.json({message: "OKEY", result: req.user.userid});
// });
//ここまで

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
            take: 2,
        });
        res.json({latestPosts});
        console.log(latestPosts)
    } catch (e) {
        next(error)
    } finally {
        await prisma.$disconnect();
    }
});


module.exports = router;