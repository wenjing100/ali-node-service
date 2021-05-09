const { verifyToken } = require('./jwtMethods.js');

/* 自定义用户授权确认中间件 */
function testAuth(req,res,next){
  //接受 客户端传递的token  
  let token = '';
  let isOutOfData = false;
  if(req.headers.authorization){
    token = req.headers.authorization.split(' ').pop();
  }
  if(!token){//token丢失
    isOutOfData = true;
  }else{
    let tokenStatus = verifyToken(token);
    //判断token没有过期
    if(tokenStatus){ 
      isOutOfData = false;
    }else{
      //token过期
      isOutOfData = true;
    }
  }

  if(isOutOfData){
    res.json({
      code:0,
      msg:'token失效'
    })
  }else{
    next();
  }
}

module.exports = testAuth;