const express = require('express');
const passport = require('passport');
const {check, validationResult} = require('express-validator');
const {calcHash, generateSalt} = require('../util/auth');
const {PrismaClient} = require('@prisma/client');
// new
const router = express.Router();
const prisma  = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//サインイン表示
router.get("/signin", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({msg: error.msg});
  }
});

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

//post内容とりあえず表示するだけ
router.get('/post', async (req, res, next) => {
  try {
    const users = await prisma.post.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({msg: error.msg});
  }
})

module.exports = router;