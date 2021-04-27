var express = require('express');
var router = express.Router();
// const auth = require('../utils/auth.js')
const jwtAuth = require('koa-jwt');
const SECRET = require('../config/SECRET.js');


router.get('/userinfo',jwtAuth({SECRET}),(req,res,next)=>{
   res.json({
     code:1,
     uninfo:{
       un:'张三',
       age:18
     }
   })
})

module.exports = router;