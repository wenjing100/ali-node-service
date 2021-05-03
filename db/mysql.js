const mysql = require('mysql')
const { MY_SQLCONF } = require('../config/db.js')
//创建连接池pool
let pool = mysql.createPool( MY_SQLCONF );

//创建mysql使用的api(一个函数)
function exec(sql, arr = [], callback){
    //建立连接
    pool.getConnection(( err, connection )=>{
        if(err){
            console.log('exec里面错误');
            console.log(err);
            return;
        }
        // err:错误  result:结果  fields:字段
        connection.query(sql, arr, (err, result, fields) => {
            //释放单个连接回连接池
            connection.release();
            if(err) throw err;
            callback && callback(result,fields)
        });
    });  
}

module.exports = {
    exec,
    escape:mysql.escape
}
