const {PrismaClient} = require("@prisma/client");
const scrypt = require("../util/scrypt");
const prisma = new PrismaClient();

const main = async () => {
    let salt;
    // 一人目
    salt = scrypt.generateSalt();
    await prisma.user.upsert({
        where: {username: "tarotaro"},
        update: {},
        create: {
            username: "tarotaro",
            name: "taro",
            password: scrypt.calcHash("yamada", salt),
            salt,
            gender: "Male",
            dateOfBirth: "2000-01-01T01:01:01+09:00",
            profileImg: "",
            bio: "5㌔減めざしてがんばります(^_^)❗",
        }
    });

    //二人目
    salt = scrypt.generateSalt();
    await prisma.user.upsert({
        where: {username: "hanakokko"},
        update: {},
        create: {
            username: "hanakokko",
            name: "hanako",
            password: scrypt.calcHash("flower", salt),
            salt,
            gender: "Female",
            dateOfBirth: "2000-04-02T01:01:01+09:00",
            profileImg: "",
            bio: "毎日継続",
        }
    });
};

main()
    .then(async () => {
        //切断待ち
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })