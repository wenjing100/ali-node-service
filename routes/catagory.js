var express = require('express');
var router = express.Router();
const cors = require('cors');
const { exec } = require('../db/mysql.js');

router.get('/side', cors(), function (req, res, next) {
  let sql = `select * from category where pid between 2 and 4;`
  exec(sql, [], function (result, fields) {
    console.log('返回catagory');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }
  })
});


module.exports = router;