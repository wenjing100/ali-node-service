var express = require('express');
var router = express.Router();
//引入cors 解决跨域
const cors = require('cors');

/* Login  */
router.post('/',cors(), function(req, res, next) {
  let { un, psw } = req.query;
  let sql = `select * from buyers where buyer_name = '${un}' and psw = '${psw}' `
  exec(sql, [], function (result, fields) {
    console.log('登陆');
    if (result.length) {
      res.json({
        code:1,
        data:result,
        message:'nVIPuser',
        token:'lnsoiqeo0'
      })
    }else{
      res.json({
        code:0,
        data:{},
        message:'no such user',
        token:''
      })
    }
  })
});


module.exports = router;