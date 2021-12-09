let cors = require('cors');
// let createError = require('http-errors');
let express = require('express');
// let path = require('path');
// let cookieParser = require('cookie-parser');
let logger = require('morgan');
// let compress = require('compression');
// let bodyParser = require('body-parser');
// let methodOverride = require('method-override');
// let session = require('express-session');
// let flash = require('connect-flash');
let passport = require('passport');

let errorHandler = require("./error-handler");

//Database setup
let mongoose = require('mongoose');
let dbURI = require('./config');

// Connect to the Database
mongoose.connect(dbURI.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

let app = express();

// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: "sessionSecret"
// }));
// Enables cors.
app.use(cors());
app.options('*', cors());

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey');

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../node_modules')));

// Sets up passport
// app.use(flash());
app.use(passport.initialize());
// app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey', surveyRouter);


/**
 * Any error handler middleware must be added AFTER you define your routes.
 */
 app.use(errorHandler);

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   res.status(404).json({ statusCode: 404, message: "The endpoint does not exist."});
 });
 

module.exports = app;
