const express = require('express');
const passport = require('passport');
const {check, validationResult} = require('express-validator');
const {calcHash, generateSalt} = require('../util/auth');
const {PrismaClient} = require('@prisma/client');
// new
const router = express.Router();
const prisma  = new PrismaClient();


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
router.get('/', function(req, res, next) {
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
  }catch (e) {
    console.error(e);
    return res.status(500).json({message: "サーバーエラー発生"});
  }
});

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

//サインイン表示
router.get("/signin", async (req, res, next) => {
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


//post内容とりあえず表示するだけ
router.get('/post', async (req, res, next) => {
  try {
    const users = await prisma.post.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({msg: error.msg});
  }
})

router.get('/user/:userId', async (req, res, next) => {
  console.log(req.query.userId)
})

module.exports = router;
