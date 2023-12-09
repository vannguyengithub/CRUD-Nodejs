var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');

const systemConfig = require('./configs/system');

// getting-started.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://project-nodejs:sCWV94iyfpBI8uVQ@cluster0.2ja607x.mongodb.net/project-nodejs-test').
// ?retryWrites=true&w=majority
 catch(error => handleError(error)); 

mongoose.connection.on('error', err => {
  logError(err);
});

// 01032001 -> pass môngđb


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'backend');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// local variable
app.locals.systemConfig = systemConfig;

// setup router
app.use(`/${systemConfig.prefixAdmin}`, require('./routes/backend/index'));
app.use('/', require('./routes/frontend/index')); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { pageTitle: 'Error page!'});
});

module.exports = app;


