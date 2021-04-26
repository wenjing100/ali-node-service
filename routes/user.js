var express = require('express');
var router = express.Router();
const auth = require('../utils/auth.js')

router.get('/userinfo',auth,(req,res,next)=>{
   res.json({
     code:1,
     uninfo:{
       un:'张三',
       age:18
     }
   })
})

module.exports = router;