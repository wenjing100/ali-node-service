
module.exports = {
    //web服务端口
    PORT:'8080',
    //CORS跨域相关信息
    CORS:{
        ALLOW_ORIGIN:"*",
        CREDENTIALS:false,
        HEADERS:"Content-Type,Accept,Cookie,X-Request-With,Access-Token,Content-Length,Authorization",
        ALLOW_METHODS:"PUT,POST,GET,DELETE,OPTIONS,HEAD"
    },
    //session存储相关配置
    SESSION:{
        secret:'Cwj12345##__',
        saveUninitialized:false,
        resave:false,
        cookie:{
          path:'/',//根目录的话，前端的每个页面都可以访问到了;根目录是默认配置，其实也可以不写
          httpOnly:true,//让前端js无法访问网站cookie（安全）;默认配置
          maxAge:24*60*60*1000,//设置cookie时效--24h
        }
      }
}
