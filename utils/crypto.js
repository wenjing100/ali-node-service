/* 对用户密码加密功能 */
const crypto = require('crypto');

//创建 密钥，这个是自己定义的
const SECRET_KEY = 'AAJWtoseeyou4321##';

//md5加密
function md5(content){
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');//转成16进制
}

//加密函数
function genPassword(pswd){
    let str = `password=${pswd}key=${SECRET_KEY}`
    return md5(str);
}

module.exports = {
    genPassword
}