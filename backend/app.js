const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {config} = require('./util/auth');
const cors = require('cors');

//sessionとpassport
const session = require('express-session');
const passport = require('passport');
const passportConfig = config(passport);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//axios bypass
app.use('/axios', express.static(path.join(
    __dirname, "node_modules", "axios", "dist"
)));

//test root
app.get("/test", (req, res, next) => {
    res.json({msg: "HELLO, THIS IS TEST-ROOT PAGE OF BACKEND!^_^"});
});


//sessionの設定
app.use(session({
    secret: "/wbvHDsvnvfJjUgemOv2w87wXINT7buKwm9ZwrAa2cgKcHmk",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000}
}))
//passport
app.use(passport.authenticate("session"));
//importしたauth.js
app.use(passportConfig);

//router
app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
