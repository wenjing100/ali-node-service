var express = require('express');
var router = express.Router();
const cors = require('cors');
const { exec,escape } = require('../db/mysql.js');

//查询购物出列表
router.get('/', cors(), function (req, res, next) {
  let { bid } = req.query;
  bid = escape(bid);
  let sqlstr = `select a.u_id,a.g_id,a.goods_num,a.g_status,b.g_name,b.price,b.top_imgs from cart a, goods_details b where a.u_id = ${bid} and b.iid = a.g_id;`;
  console.log(sqlstr);
  exec(sqlstr, [], function (result, fields) {
    res.json({
      status: 0,
      data: result,
      msg: '购物车查询成功'
    })
  })
});

router.post('/insert', cors(), function (req, res, next) {
  let { bid, gid, num } = req.query;
  //防止SQL注入处理
  bid = escape(bid);
  gid = escape(gid);
  num = escape(num);
  // 查询是否存在商品
  let sqlstr = `select * from cart where g_id =${gid}`;
  exec(sqlstr, [], function (result, fields) {
    //没有商品添加数据
    sqlstr = `insert into cart (u_id,g_id,goods_num,g_status,create_time)
        values(${bid},${gid},${num},1,current_timestamp())
    `;
    if (result.length > 0) {//已有商品，增加数量
      sqlstr = `update cart set goods_num = goods_num + ${num} where g_id = ${gid} and u_id = ${bid}`
    }
    exec(sqlstr, [], function (result, fields) {
      res.json({
        status: 0,
        msg: '查询数据成功'
      })
    });
  })

});

router.post('/del', cors(), function (req, res, next) {
  let { bid, gid } = req.query;
  bid = escape(bid);
  gid = escape(gid);
  let sqlstr = `delete from cart where g_id =${gid} and u_id = ${bid}`;
  exec(sqlstr, [], function (result, fields) {
    res.json({
      status: 0,
      msg: '购物车删除成功'
    })
  })

});

router.post('/sub', cors(), function (req, res, next) {
  let { bid, gid, num } = req.query;
  bid = escape(bid);
  gid = escape(gid);
  num = escape(num);
  let sqlstr = `update cart set goods_num = goods_num - ? where g_id = ? and u_id = ?`;
  exec(sqlstr, [num, gid, bid], function (result, fields) {
    res.json({
      status: 0,
      msg: '减少'
    })
  })
});

router.post('/add', cors(), function (req, res, next) {
  let { bid, gid, num } = req.query;
  bid = escape(bid);
  gid = escape(gid);
  num = escape(num);
  let sqlstr = `select a.goods_num as num,b.inventory as inv from cart a,goods_details b where a.u_id = ${bid} and a.g_id =${gid} and b.iid = ${gid};`;
  exec(sqlstr, [], function (result, fields) {
    console.log(result)
    let isEmpty = result.inv - result.num >= 0 ? false : true;
    if (isEmpty) {
      res.json({
        status: -1,
        msg: '库存不足'
      })
    } else {
      sqlstr = `update cart set goods_num = goods_num + ? where g_id = ? and u_id = ?`;
      exec(sqlstr, [num, gid, bid], function (result, fields) {
        res.json({
          status: 0,
          msg: '增加'
        })
      });
    }
  });
});

router.post('/status', cors(), function (req, res, next) {
  let { bid, gid, status } = req.query;
  bid = escape(bid);
  gid = escape(gid);
  status = escape(status);
  let sqlstr = `update cart set g_status =  ? where g_id = ${gid} and u_id = ${bid}`;
  exec(sqlstr, [status], function (result, fields) {
    res.json({
      status: 0,
      msg: '状态修改成功'
    })
  });
});

router.post('/statusall', cors(), function (req, res, next) {
  let { bid, status } = req.query;
  bid = escape(bid);
  status = escape(status);
  let sqlstr = `update cart set g_status = ? where u_id = ?`;
  exec(sqlstr, [status,bid], function (result, fields) {
    res.json({
      status: 0,
      msg: '状态修改成功'
    })
  });
});

module.exports = router;
