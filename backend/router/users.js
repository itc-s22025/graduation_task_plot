const router = require('express').Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// ランダムな文字列を生成
const randomString = crypto.randomBytes(64).toString('hex');

router.use(
    session({
        secret: randomString,
        resave: false,
        saveUninitialized: false
    })
);


// function check(req, res){
//     if(req.session.login === undefined){
//         req.session.back = '/';
//         return true
//     }else {
//         return false
//     }
// }

router.get("/signin", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({msg: error.msg});
    }
})


router.post("/signin", async (req, res, next) => {
    // await prisma.user.findMany({
    //     where:{
    //         id: req.body.id,
    //         password: req.body.password,
    //     }
    // }).then(usr => {
    //     if (usr != null && usr[0] != null){
    //         req.session.login = usr[0];
    //         var back = req.session.back;
    //         if (back == null){
    //             back = '/Home';
    //         }
    //         res.redirect(back)
    //     }else {
    //         var data = {
    //             msg: "名前かパスワードに問題があります。。。"
    //         }
    //         res.render('SignIn', data)
    //     }
    // });
    //
    const {id, password} = req.body;
    const user = await prisma.user.findMany({
        where: {
            id: id,
            password: password,
        },
    });
    res.redirect("/Home")

    if (!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({error: 'INVALID CREDENTIALS...;_;'});
    }

    //認証が成功したら、セッションにユーザー情報を保存
    req.session.user = {id: user.id};

    return res.status(200).json({success: true});

});


// ユーザーが認証されているかどうかを確認するミドルウェア
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: '認証済みじゃないです' });
    }
};

// ログイン状態を確認するエンドポイント
router.get('/check-auth', isAuthenticated, (req, res) => {
    res.status(200).json({ success: true, user: req.session.user });
});

module.exports = router;