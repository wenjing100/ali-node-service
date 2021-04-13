const env =process.env.NODE_ENV

let MY_SQLCONF
let MY_RDISCONF
if(env === 'dev'){
    //mysql配置
    MY_SQLCONF = {
        host:'47.110.38.241',//47.110.38.241
        port:'3306',
        user:'root',
        password:'wenjing100aa',
        database:'wenjing_01',//wenjing_01
        connectionLimit:10,
        multipleStatements:true
    }
    //redis配置
    MY_RDISCONF = {
        port:'6379',
        host:'127.0.0.1'
    }
}

if (env === 'production'){
    MY_SQLCONF = {
        host:'47.110.38.241',
        port:'3306',
        user:'root',
        password:'wenjing100aa',
        database:'wenjing_01',
        connectionLimit:10,
        multipleStatements:true
    }
    //redis配置
    MY_RDISCONF = {
        port:'6379',
        host:'127.0.0.1'
    }
}

module.exports = {
    MY_SQLCONF,
    MY_RDISCONF
}