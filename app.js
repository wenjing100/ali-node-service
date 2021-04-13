var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');
const sessionTestRouter = require('./routes/user');
const aboutRouter = require('./routes/about');
const loginRouter = require('./routes/login');
const detailsRouter = require('./routes/details');
const cartRouter = require('./routes/cart');
const catagoryRouter = require('./routes/catagory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

app.use(session({
  secret:'Cwj12345##__',
  cookie:{
    path:'/',//根目录的话，前端的每个页面都可以访问到了;根目录是默认配置，其实也可以不写
    httpOnly:true,//让前端js无法访问网站cookie（安全）;默认配置
    maxAge:24*60*60*1000,//设置cookie时效--24h
  }
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/home', homeRouter);
app.use('/user', sessionTestRouter);
app.use('/api/about', aboutRouter);
app.use('/api/login', loginRouter);
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
