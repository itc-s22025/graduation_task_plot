const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {

    const users = await prisma.user.findMany({
        orderBy: [{id: "asc"}]
    });
    const data = {
        title: "Users/ Add",
        content: users
    }
    res.render('SignUp/index', data)
})


module.exports = router;