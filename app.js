var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//passport config
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/keys').MongoURI;

//CONNECT TO MONGO
mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log('Mongodb Connected'))
.catch(err=> console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: true}));

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global var
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('sucess_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

//ROUTES
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var landingPageRouter = require('./routes/landingPage.js')

app.use('/', landingPageRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);


module.exports = app;