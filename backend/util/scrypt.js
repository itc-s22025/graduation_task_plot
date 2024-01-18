const crypto = require("node:crypto");

/*　計算コスト、OWASP推奨値*/
const N = Math.pow(2, 17);  //2の17乗回ハッシュ化する

/*　↑やるとメモリ足りなくなるから最大メモリサイズ変更*/
const maxmem = 144 * 1024 * 1024; // 144 MiB

/* 生成するハッシュ値の長さ*/
const keyLen = 192;  // 192bit

/*　組み合わせて使うハッシュソルトの長さ*/
const saltSize = 64;


/*
* ソルト用にランダムなバイト列を生成
* @return {Buffer}
*/
const generateSalt = () => crypto.randomBytes(saltSize)

/*
* 文字列plainからScryptによるハッシュ値を計算
* @param {String} plain
* @param {Buffer} salt
* @param {Buffer}
*/
const calcHash = (plain, salt) => {
    // plain -> 平文　　salt ->ソルト
    // unicordの合字対策？
    const normalized = plain.normalize();
    const hash = crypto.scryptSync(normalized, salt, keyLen, {N, maxmem});
    if (!hash) {
        throw Error("なんかエラー");
    }
    return hash;
};

module.exports = {generateSalt, calcHash};