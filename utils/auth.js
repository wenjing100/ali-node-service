/* 自定义用户授权确认中间件 */
function testAuth(req,res,next){
  if(req.headers.token){
    //已经验证
    next();
  }else{
    //用户未授权
    res.sendStatus(401)
  }
}

module.exports = testAuth;