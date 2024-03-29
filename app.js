var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const passport = require('passport');

require('dotenv').config()

const { CONNECTION_STRING } = require('./constants/dbSettings');

const indexRouter = require('./routes/index');
const questionRouter = require('./routes/questions/router');
const mediaRouter = require('./routes/media/router');

const adminRoutes = require('./routes/admin/routes');
const userRouter = require('./routes/user/routes');

const {
  passportConfigAdmin,
  passportConfigLocalAdmin,
} = require('./middleWares/passportAdmin');

passport.use('jwtAdmin', passportConfigAdmin);
passport.use('localAdmin', passportConfigLocalAdmin);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: '*',
  }),
);

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_STRING);

app.use('/', indexRouter);
app.use('/questions', questionRouter);
app.use('/media', passport.authenticate('jwtAdmin', { session: false }), mediaRouter);

app.use('/admin', adminRoutes)

app.use('/user', userRouter)

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
  res.render('error');
});

module.exports = app;
