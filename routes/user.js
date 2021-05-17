var express = require('express');
var router = express.Router();
// const cors = require('cors');//引入cors 解决跨域
const { exec,escape } = require('../db/mysql.js');
const randomStr = require('../utils/name-gen.js');//生成随机的用户id
const Auth = require('../utils/auth.js');//token验证
const { createToken } = require('../utils/jwtMethods.js');


/* 获取用户列表 */
router.get('/',Auth,(req,res,next)=>{
  res.json({
    code:1,
    data:[{
      uname:'张三',
      age:18
    }],
    msg:'获取用户列表'
  })
})

/* Login  */
router.post('/login', function(req, res, next) {
  let { un, psw } = req.query;
  un = escape(un);
  psw = escape(psw);
  let sql = `select b_id,buyer_name,logo from wenjing_01.buyers where b_id = ${un} and psw = ${psw}; `;

  exec(sql, [], function (result, fields) {
    if (result.length) {//登陆成功
      //jwt 标准 生成令牌
      let tk = createToken({//用户信息
          uname:result[0].buyer_name
        })
      res.json({
        code:1,
        data:result,
        message:'none-VIP-user',
        token:tk
      })
    }else{
      res.json({
        code:0,
        message:'no such user',
      })
    }
  })
});

/* 注册 */
router.post('/register', function(req, res, next) {
  let { un, psw } = req.query;
  un = escape(un);
  psw = escape(psw);

  //判断用户名是否已经存在
  let sql = `select * from wenjing_01.buyers where buyer_name = ${un};`;
  exec(sql, [], function (result, fields) {
    //'验证注册名是否存在'
    if (result.length) {
      res.json({
        code:-1,
        message:'该用户名已经存在',
      }).sendStatus(400)
    }else{
      let bid = randomStr(6);
      // 判断随机的id是否已经被占用
      sql = `select * from wenjing_01.buyers where b_id = ${bid};`
      exec(sql, [], function (result, fields) {
        if (result.length) {
          bid = randomStr(6);
        }
        sql = `insert into buyers(b_id,buyer_name,logo,psw) values(${bid},${un},'http://47.110.38.241/avator/avator-default.jpg',${psw});`;
        exec(sql, [], function (result, fields) {
          res.json({
            code:1,
            message:'注册成功',
          })
        });
      });
    }
  });
});

/* 验证 */
router.post('/verify',Auth, function(req, res, next) {
  let { un } = req.query;
  //登陆 有效，并且刷新token
  let tk = createToken({
    uname:un,
  })
  res.json({
    code:1,
    msg:'登陆有效',
    token:tk,
  })
});

/* 获取用户详情 */
router.post('/uinfo',Auth, function(req, res, next) {
  let { un } = req.query;
  un = escape(un);
  let sql = `select * from buyers where buyer_name = ${un};`;
  exec(sql,[],function(result,fields){
    console.log(result)
    if(result.length){
      res.json({
        code:1,
        data:result
      })
    }
  });

});


module.exports = router; 
