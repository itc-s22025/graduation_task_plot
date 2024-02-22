const express = require('express');
const passport = require('passport');
const {check, validationResult} = require('express-validator');
const {calcHash, generateSalt} = require('../util/auth');
const {PrismaClient} = require('@prisma/client');
// new
const router = express.Router();
const prisma = new PrismaClient();


//ログイン認証
router.post("/signin", passport.authenticate("local", {
    //認証通った場合
    successReturnToOrRedirect: "/",
    //失敗した場合
    failureRedirect: "/SignIn",
    //失敗したときのメッセージ　上で指定したmessageがでる
    failureMessage: true,
    //これないとreturntoが効かない？
    keepSessionInfo: true
}))

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect("/users/check");
});


router.post("/signup", [
    check("userName", "名前の入力は必須です").notEmpty(),
    check("password", "パスワードの入力は必須です").notEmpty()
], async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            console.log(errors);
            return res.status(400).json({errors: errors});
        }
        //OKだったらDB登録へ
        const {userName, password, name, bMonth, bYear, gender, filter} = req.body;
        const salt = generateSalt();
        const hashedPassword = calcHash(password, salt);

        await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
                name,
                bMonth,
                bYear,
                gender,
                filter,
                salt
            }
        });
        return res.status(200).json({message: "ユーザ登録成功"});
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: "サーバーエラー発生"});
    }
});

// ログインしてるか　してなかったら他のデータ取れない
router.use((req, res, next) => {
    if (!req.user) {
        res.status(400).json({message: "ログインしてないです"});
        return
    }
    next();
})
router.get("/check", (req, res, next) => {
    res.json({message: "ログインできたよ", result: req.user});
});
// ここまで

//サインイン表示
router.get("/signin", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +req.user.id
            },
            include: {
                post: {
                    orderBy: {createdAt: 'desc'}
                },
                follows: {
                    orderBy: {createdAt: 'desc'}
                }
            }
        });
        res.json({user})
    } catch (e) {
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }
});

//logout
router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/users");
    });
});

router.get("/logout", (req, res, next) => {
    res.json({message: "これが見れるならまだログインしてるよ", result: req.user.name});
});

// ユーザーをフォローするエンドポイント
// router.post('/users/:followerId/follow/:followeeId', async (req, res, next) => {
//     const { followerId, followeeId } = req.params;

router.post('/follow', async (req, res, next) => {
    try {
        // フォローを作成する
        await prisma.follows.create({
            data: {
                follower_id: +req.body.follower_id,
                followee_id: +req.body.followee_id,
                userId: +req.user.id
            }
        });
        return res.status(201).json({message: 'Successfully followed user'});
    } catch (error) {
        console.error('Error following user:', error);
        return res.status(500).json({error: 'Failed to follow user'});
    }
});

router.get('/follow', async (req, res, next) => {
    const followlist = await prisma.follows.findMany({
        where: {
            userId: +req.user.id
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
    res.json({followlist})
})

//follower
router.get("/follow/all", async (req, res, next) => {
    try {
        const followerList = await prisma.follows.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        })
        res.json({followerList})
    }catch (e) {
        console.log(e)
    }
})

router.post('/unFollow', async (req, res, next) => {
    try {
        //フォローを外す
        await prisma.follows.deleteMany({
            where:{
                follower_id: +req.body.follower_id,
                followee_id: +req.body.followee_id,
                userId: +req.user.id
            }
        });
        return res.status(200).json({ message: 'Successfully unfollowed user' });
    }catch (e) {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ error: 'Failed to unfollow user' });
    }
})

router.get("/likes", async (req, res, next) => {
    const likes = await prisma.likes.findMany({
        where: {
            userId: +req.user.id
        },
        include: {
            post: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            userName: true,
                            gender: true
                        }
                    }
                }
            }
        }
    })
    res.json({likes})
})

//post内容とりあえず表示するだけ
router.get('/:uid', async (req, res, next) => {
    const uid = req.params.uid;
    const user = await prisma.user.findUnique({
        where: {
            userName: uid
        },
        include: {
            post: {
                orderBy: {createdAt: 'desc'},
                include: {
                    likes: true,
                }
            },
            follows: true
        }
    })
    res.json({user})
})


router.get("/gender/female", async (req, res, next) => {
    try {
        const FemaleUsers = await prisma.user.findMany({
            orderBy: {createdAt: 'asc'},
            where: {
                gender: "Female"
            },
            include: {
                post: {
                    orderBy: {createdAt: 'desc'}
                }
            }
        });
        res.json({FemaleUsers})
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
})

async function updateUser(id, newData) {
    try {
        const updateUser = await prisma.user.update({
            where: {id},
            data: newData,
        });
        return updateUser;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw new Error('Failed to update user data');
    }
}

module.exports = {router, updateUser};
router.get('/user/:userId', async (req, res, next) => {
    console.log(req.query.userId)
})

module.exports = router;
