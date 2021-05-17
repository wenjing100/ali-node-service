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
    console.log('验证00000')
  }else{
    let tokenStatus = verifyToken(token);//----------------------------------
    console.log('验证11111')
    //判断token没有过期
    if(tokenStatus){ 
      isOutOfData = false;
    }else{
      //token过期
      isOutOfData = true;
      console.log('验证2222')
    }
  }
  if(isOutOfData){
    res.sendStatus(401)//token失效，发送401
  }else{
    next();
  }
}

module.exports = testAuth;