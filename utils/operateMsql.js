
const { exec } = require('../db/mysql.js');

function temp_set(sqlstr) {
   exec(sqlstr,[],function(result,fields) {
    console.log('测试返回结果');
    console.log(result)
  }) 
}
module.exports = {
    temp_set
}