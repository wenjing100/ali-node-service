
module.exports = {
    //web服务端口
    PORT:'',
    //CORS跨域相关信息
    CORS:{
        ALLOW_ORIGIN:"*",
        CREDENTIALS:true,
        HEADERS:"Content-Type,Accept,Cookie,X-Request-With,Access-Token",//Content-Length,Authorization,
        ALLOW_METHODS:"PUT,POST,GET,DELETE,OPTIONS,HEAD"
    }
}
