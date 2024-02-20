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
            where:{
              user:{
                  filter: false
              }
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                user: {
                    select:{
                        id: true,
                        name: true,
                        userName: true,
                        gender: true
                    }
                },
                likes: true
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

//male
router.get("/male", async (req, res, next) => {
    try {
        const MaleUsersPosts = await prisma.post.findMany({
            where: {
                user: {
                    gender: "Male"
                }
            },
            orderBy: {updatedAt: 'desc'},
            include: {
                user: {
                    select:{
                        id: true,
                        name: true,
                        userName: true,
                        gender: true
                    }
                },
                likes: true
            }
        });
        res.json({MaleUsersPosts})
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
})

//female
router.get("/female", async (req, res, next) => {
    try {
        const FemaleUsersPosts = await prisma.post.findMany({
            where: {
                user: {
                    gender: "Female"
                }
            },
            orderBy: {updatedAt: 'desc'},
            include: {
                user: {
                    select:{
                        id: true,
                        name: true,
                        userName: true,
                        gender: true
                    }
                },
                likes: true
            }
        });
        res.json({FemaleUsersPosts})
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
})

router.post("/create", [
    check("text").notEmpty()
], async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            const errors = result.array();
            console.log(errors)
            return res.status(400).json({message: errors});
        }
        // const {text} = req.body;
        await prisma.post.create({
            data: {
                text: req.body.text,
                image: req.body.image,
                menu: req.body.menu,
                time: req.body.time,
                timeUnit: req.body.timeUnit,
                userId: +req.user.id
            }
        });
        res.status(201).json({message: "createできたよ〜"})
    } catch (e) {
        console.error(e)
    }
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

// いいねの追加または削除のエンドポイント
router.post("/like", async (req, res, next) => {
    const { postId } = req.body;
    const userId = req.user.id;
    try {
        // いいねが既に存在するかチェック
        const existingLike = await prisma.likes.findFirst({
            where: {
                userId: userId,
                postId: postId,
            },
        });
        if (existingLike) {
            // いいねが既に存在する場合は削除
            await prisma.likes.delete({
                where: {
                    id: existingLike.id,
                },
            });
            res.status(200).json({ message: 'いいねを取り消しました。' });
        } else {
            // いいねが存在しない場合は追加
            await prisma.likes.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });
            res.status(201).json({ message: 'いいねを追加しました。' });
        }
    } catch (error) {
        console.error('エラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
});

//
router.get("/likecount/:postId", async (req, res, next) => {
    const { postId } = req.params;
    try {
        const likeCount = await prisma.likes.count({
            where: {
                postId: parseInt(postId),
            },
        });
        res.status(200).json({ likeCount });
    } catch (error) {
        console.error('エラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
});

module.exports = router;