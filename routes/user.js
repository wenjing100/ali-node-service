var express = require('express');
var router = express.Router();
const { temp_set } = require('../utils/operateMsql.js')

router.get('/session-test',(req,res,next)=>{
    let sql = ``;
    for(let i = 0; i < 69; i++){
        
    }
  
  temp_set(sql);
  console.log("aaa")
})

module.exports = router;