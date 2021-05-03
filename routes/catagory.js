var express = require('express');
var router = express.Router();
const cors = require('cors');
const { exec } = require('../db/mysql.js');

router.get('/', cors(), function (req, res, next) {
  let { id , size } = req.query;
  console.log(id);
  let sql = `select iid,g_name,inventory,price,marketprice,top_imgs from wenjing_01.goods_details where cat = ${id} limit ${size}`;

  exec(sql, [], function (result, fields) {
    console.log('返回catagory--show');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }else{
      res.json({
        status: -1,
        data: [],
        msg: '没有对应数据'
      })
    }
  })
});
router.get('/one', cors(), function (req, res, next) {
  let sql = `SELECT * FROM wenjing_01.catagory_show`;
  exec(sql, [], function (result, fields) {
    console.log('返回catagory--show');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }else{
      res.json({
        status: -1,
        data: [],
        msg: '没有对应数据'
      })
    }
  })
});

router.get('/side', cors(), function (req, res, next) {
  let sql = `select a.id,a.name,a.pid from category a, (SELECT distinct cat FROM wenjing_01.goods_details) b where a.id = b.cat;`
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
