var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const addressRouter = require('./routes/adress');
// const loginRouter = require('./routes/login');
const detailsRouter = require('./routes/details');
const cartRouter = require('./routes/cart');
const catagoryRouter = require('./routes/catagory');
const CONFIG = require('./config/CORS.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 跨域方案
app.all('*',(req,res,next)=>{
  const {
    ALLOW_ORIGIN,
    CREDENTIALS,
    HEADERS,
    ALLOW_METHODS
  } = CONFIG.CORS;
  res.header("Access-Control-Allow-Origin",ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials",CREDENTIALS);
  res.header("Access-Control-Allow-Headers",HEADERS);
  res.header("Access-Control-Allow-Methods",ALLOW_METHODS);
  
  req.method === 'OPTIONS'? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN FROM *'):next();
})


//session 设置
app.use(session(CONFIG.SESSION));

// app.use('/', indexRouter);
app.use('/api/home', homeRouter);
app.use('/api/user', userRouter);
app.use('/api/address', addressRouter);
// app.use('/api/login', loginRouter);
app.use('/api/details',detailsRouter);
app.use('/api/cart',cartRouter);
app.use('/api/catagory',catagoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
