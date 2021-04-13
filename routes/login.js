var express = require('express');
var router = express.Router();
//引入cors 解决跨域
const cros = require('cors');

/* GET home page. */
router.get('/',cros(), function(req, res, next) {
  console.log('返回数据');
  res.json({
      code:1,
      data:{},
      message:'信息',
      token:'lnsoiqeo0'
  })
});


module.exports = router;