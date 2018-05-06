var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon  = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser  = require('body-parser');
var webpack  = require('webpack');

// 引入history模块
var history = require('connect-history-api-fallback');

// 正式环境时，下面两个模块不需要引入
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('../../build/webpack.dev.conf');

/*var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');*/


// var app = require('../app');
// var debug = require('debug')('testejswebapp:server');
// var http = require('http');

var app = express();

// 引入history模式让浏览器进行前端路由页面跳转
app.use(history())

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());*/
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/


var compiler = webpack(config)
//webpack 中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', function (req, res) {
  res.sendFile('./views/index.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  console.log(err)
  res.send(err.message)
});


/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || 9999);
// app.set('port', port);

app.on('error', onError);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

console.log(process.env.PORT);
/**
 * Listen on provided port, on all network interfaces.
 */
// 设置监听端口
app.listen(port, () => {
  console.info(`服务已经启动，监听端口${port}`)
})

module.exports = app;
