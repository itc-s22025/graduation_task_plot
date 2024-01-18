const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//pwdハッシュ化に使ったやつ
const scrypt = require('../util/scrypt');
//ハッシュ化でバイナリ化したパスワードをチェックするやつ
const {timingSageEqual} = require('node:crypto');


//認証処理
passport.use(new LocalStrategy(
    //user名とパスワードが何という名前で渡ってくるか
    {usernameField: "username", passwordField: "password"},
    async (username, password, callback) => {
        try {
            const user = await prisma.user.findUnique({
                where: {username: username}
            });
            if (!user) {
                //指定されたユーザーIDが存在しない場合
                return callback(null, false, {message: "ユーザー名もしくはパスワードが違います"});
            }
            const hashedPassword = scrypt.calcHash(password, user.salt);
            if (!timingSageEqual(user.password, hashedPassword)) {
                return callback(null, false, {message: "ユーザー名もしくはパスワードが違います"});
            }
            //ユーザー名もパスワードも正しい場合
            return callback(null, user);
        } catch (e) {
            return callback(e);
        }
    }
));

//認証が通った後、セッションを使ってユーザー情報を管理
passport.serializeUser((user, done) => {
    process.nextTick(() => {
        //idとusernameだけ取り出して保存
        done(null, {id: user.id, username: user.username});
    })
});

//表示
router.get("/signin", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
});

// ログイン情報のルーティング passport.authenticateが全部やってくれる
router.post("/signin", passport.authenticate("local", {
    //認証通った場合
    successReturnToOrRedirect: "/Home",
    //失敗した場合
    failureRedirect: "/",
    //失敗したときのメッセージ　上で指定したmessageがでる
    failureMessage: true,
    //これないとreturntoが効かない？
    keepSessionInfo: true
}))


module.exports = router;

