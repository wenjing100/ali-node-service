var express = require('express');
var router = express.Router();
const cors = require('cors');
const { exec } = require('../db/mysql.js');

router.get('/', cors(), function (req, res, next) {
  function setSql({ id = 1, size = 20}) {
    let sql = ``;
    if(id == 1){
      sql = `SELECT * FROM wenjing_01.catagory_show`
    }else{
      sql = `select iid,g_name,inventory,price,marketprice,top_imgs from wenjing_01.goods_details where cat = ${id} limit ${size}`
    }
    return sql
  }
  exec(setSql(req.query), [], function (result, fields) {
    console.log('返回catagory--show');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }
  })
});

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