var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
//We are including mongoose in the program using require
// const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
const sessionRouter = require('./routes/session');
const booksRouter = require('./routes/book');
const usermysqlRouter = require('./routes/usermysql');
const examcookieRouter = require('./routes/examcookie');
const checkloginmysqlRouter = require('./routes/checkloginmysql');
const fileRouter = require('./routes/file');
const filemanagementRouter = require('./routes/filemanagement');
const fileUploadRouter = require('./routes/servers');

var app = express();
//We are defining a connection string to connect to the mongodb
// let mongoConnUrl = 'mongodb://localhost/westsidenode';
// //We are connecting the mongodb
// mongoose.connect(mongoConnUrl, {useNewUrlParser: true});
// //We are getting the connection pointer
// let db = mongoose.connection;
// //We are now adding error event and it will run if there is any error in connecting to mongodb
// db.on('error', function (error) {
//   console.log('unable to connect');
//   console.log(error);
// });
// //We are adding open event and responding in the call back function if connection is successful
// db.on('open', function () {
//   console.log('we are connected to the mongodb server via mongoose');
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'session_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use('/', indexRouter);

app.use('/session', sessionRouter);
app.use('/books', booksRouter);
app.use('/usermysql', usermysqlRouter);
app.use('/examcookie', examcookieRouter);
app.use('/checkloginmysql', checkloginmysqlRouter);
app.use('/filemanagement', filemanagementRouter);
app.use('/file', fileRouter);
app.use('/fileUpload', fileUploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
