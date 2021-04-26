var express = require('express');
var router = express.Router();
const cors = require('cors');
const { exec } = require('../db/mysql.js');
/* GET home page. */
/**
 * pageSize: 一页多少商品  默认8
 * pageIndex：第几页  默认1
 * sortType: 排序方式 asc  desc
 * 
 */
 router.get('/multidata/first', cors(), function (req, res, next) {
    res.json({
      errno: 0,
      data: {
        banner: {
          list: [
            { link: 'http://47.110.38.241', title: '换新女装节', image: '0.jpg' },
            { link: 'http://47.110.38.241', title: '女神造物', image: '1.jpg' },
            { link: 'http://47.110.38.241', title: '种草', image: '2.jpg' },
            { link: 'http://47.110.38.241', title: '爱豆推荐', image: '3.jpg' },
            { link: 'http://47.110.38.241', title: '大促女装', image: '4.jpg' },
          ],
          otherkey: true
        },
        dKeyword: {},
        keywords: {},
        recommend: {
          list: [
            { link: 'http://47.110.38.241', title: '十点抢券', image: 'recom01.webp' },
            { link: 'http://47.110.38.241', title: '好物特卖', image: 'recom02.webp' },
            { link: 'http://47.110.38.241', title: '内购福利', image: 'recom03.webp' },
            { link: 'http://47.110.38.241', title: '季节上新', image: 'recom04.webp' },
          ],
          otherkey: true
        }

      },
      success: true
    })
  });

router.get('/multidata/list', cors(), function (req, res, next) {
  let query = req.query;
  // 取出空键值对
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }
  function setSql({ pageSize = 8, pageIndex = 1, sortType = '', hotPoint ,cat }) {
    if(!hotPoint){
      let arr = ['流行','精选','新款'];
      let rd_num = parseInt(Math.random()*2);
      console.log(rd_num);
      hotPoint = arr[rd_num];
    }
    let size = parseInt(pageSize);
    let count = size * (parseInt(pageIndex) - 1);
    let sql = `select iid,g_name,inventory,price,marketprice,top_imgs from wenjing_01.goods_details where 1 = 1`
    sql += ` and tag = '${hotPoint}'`
    if(cat){
      sql += ` and cat = ${cat}`
    }
    sql += ` order by price ${sortType}, update_time desc limit ${count},${size}`
    return sql
  }

  exec(setSql(req.query), [], function (result, fields) {
    console.log('返回homelist');
    if (result.length) {
      res.json({
        status: 0,
        data: result,
        msg: '查询数据成功'
      })
    }
  })
});

router.get('/multidata/recom', cors(), function (req, res, next) {
  let query = req.query;
  // 取出空键值对
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }
  function setSql({ pageSize = 16, pageIndex = 1, sortType = ''}) {
    let size = parseInt(pageSize);
    let count = size * (parseInt(pageIndex) - 1);
    let sql = `select iid,g_name,inventory,price,marketprice,top_imgs from wenjing_01.goods_details`

    sql += ` order by price ${sortType}, update_time desc limit ${count},${size}`
    return sql
  }
  exec(setSql(req.query), [], function (result, fields) {
    console.log('返回recomlist');
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