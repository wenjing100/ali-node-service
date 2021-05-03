var express = require('express');
var router = express.Router();
const cors = require('cors');
const { exec,escape } = require('../db/mysql.js');

router.get('/', cors(), function (req, res, next) {
  let query = req.query;
  // 取出空键值对
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }
  let id = escape(query.id);
  let sql = `select * from goods_details where iid = '${id}'`

  exec(sql, [], function (result, fields) {
    console.log('测试返回结果');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }
  })
});

router.get('/shopbrief', cors(), function (req, res, next) {
  let query = req.query;
  // 取出空键值对
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }
  let id = escape(query.id);
  let sql = `select * from shops where s_id = '${id}'`

  exec(sql, [], function (result, fields) {
    console.log('测试返回结果');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }
  })
});

router.get('/comments', cors(), function (req, res, next) {
  let query = req.query;
  // 取出空键值对
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }
  let id = escape(query.id);
  let sql = `select * from goods_comments a,buyers b where a.goods_id = '${id}'
    and a.buyer_id = b.b_id;
  `
  exec(sql, [], function (result, fields) {
    console.log('测试返回结果');
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