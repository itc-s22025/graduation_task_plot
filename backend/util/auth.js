const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const {PrismaClient} = require("@prisma/client");

//scrypt関連の定数値
const N = Math.pow(2, 17);
const maxmem = 144 * 1024 * 1024;
const keyLen = 192;
const saltSize = 64;

/**
 * Salt用のランダムバイト列生成
 * @return {Buffer}
 */
const generateSalt = () => crypto.randomBytes(saltSize);

/**
 * パスワードハッシュ値計算
 * @param {String} plain
 * @param {Buffer} salt
 * @return {Buffer}
 */
const calcHash = (plain, salt) => {
    const normalized = plain.normalize();
    const hash = crypto.scryptSync(normalized, salt, keyLen, {N, maxmem});
    if (!hash) {
        throw Error("ハッシュ計算エラー");
    }
    return hash;
};

/**
 * Passport.js の設定
 */
const config = (passport) => {
    const prisma = new PrismaClient();

    // データベースに問い合わせてユーザ名:パスワードをチェックして認証する部分
    passport.use(new LocalStrategy({
        usernameField: "userName", passwordField: "password"
    }, async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {userName: username}
            });
            if (!user) {
                // そんなユーザいないよの場合
                return done(null, false, {message: "ユーザ名かパスワードが違います"});
            }
            const hashedPassword = calcHash(password, user.salt);
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                // パスワードが違うよの場合
                return done(null, false, {message: "ユーザ名かパスワードが違います"});
            }
            // 認証OK
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }));

    // セッションストレージにユーザデータを保存するときに呼ばれる
    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            done(null, {id: user.id, userName: user.userName});
        });
    });
    // セッションストレージからデータを引っ張ってくるときに呼ばれる
    passport.deserializeUser((user, done) => {
        process.nextTick(() => {
            return done(null, user);
        });
    });

    // セッションストレージに messages を追加するミドルウェアとして関数を作って返す
    return (req, res, next) => {
        const messages = req.session.messages || [];
        res.locals.messages = messages;
        res.locals.hasMessages = !!messages.length;
        req.session.messages = [];
        next();
    };
};

module.exports = {generateSalt, calcHash, config};