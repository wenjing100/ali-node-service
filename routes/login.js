var express = require('express');
var router = express.Router();
//引入cors 解决跨域
const cors = require('cors');
const { exec } = require('../db/mysql.js');
const jwt = require('jsonwebtoken');
const SECRET = require('../config/SECRET.js');//导入密钥

/* Login  */
router.post('/',cors(), function(req, res, next) {
  let { un, psw } = req.query;
  console.log(un);
  console.log(psw);
  let sql = `select * from wenjing_01.buyers where b_id = '${un}' and psw = '${psw}'; `;
 
  exec(sql, [], function (result, fields) {
    console.log('登陆');
    if (result.length) {
      //jwt 标准 生成令牌
      console.log(result);
      let tk = jwt.sign({
        data:{//用户信息
          uname:un//result.data[0].buyer_name
        },  
        exp:Math.floor(Date.now() / 1000) + 60*60 //过期时间
      },SECRET);
      //返回带令牌 token 的数据
      res.json({
        code:1,
        data:result,
        message:'none-VIP-user',
        token:tk
      })
    }else{
      res.json({
        code:0,
        data:{},
        message:'no such user',
      })
    }
  })
});


module.exports = router;