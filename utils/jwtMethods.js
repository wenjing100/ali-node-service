const jwt = require('jsonwebtoken');
const SECRET = require('../config/SECRET.js');//导入密钥

//创建token
const createToken = (data, expTime) => {
  let obj = {
    data:data || {},
    // exp:expTime || 60*60*1000*5,
    ctime:(new Date()).getTime()
  }
  return jwt.sign(obj,SECRET,{expiresIn:expTime || '1d'});
}

//验证token
const verifyToken = (token) => {
  let result = null
  try{
    let { data,exp,ctime } = jwt.verify(token,SECRET);
    //验证token是否过期
    result = data;
  }catch(err){
    //token 过期就会报错的，问题不大
    console.log('token验证错误'+err)
  }
  return result
}

module.exports = {
  createToken,
  verifyToken
}