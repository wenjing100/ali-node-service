var express = require('express');
var router = express.Router();

const { exec,escape } = require('../db/mysql.js');
/**
 * @api {get} /api/about/address/list 获取收货地址表
 * 
 * @apiGroup address
 * @apiParamExample {json} request-example
 * {
 *    "id":1
 * }
 * @apiSuccessExample {json} success-example
 * {
 *    "status": 0,
 *    "data": {
 *    "idtest": 1,
 *    "name": "zhangsan"
 *    },
 *    "msg": "查询数据成功"
 * }
 * @apiSampleRequest /api/about
 */
router.get('/list', function(req, res, next) {
  let sqlstr = `select * from address where id = 1;` //?表示传进来的参数
  exec(sqlstr,[req.query.id],function(result,fields) {
    console.log('测试返回结果');
    if(result.length){
      res.json({
        status:0,
        data:result,
        msg:'查询数据成功'
      })
    }
  })

});

module.exports = router;