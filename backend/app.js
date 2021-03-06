// require('dotenv').config();

// const bodyParser   = require('body-parser');
// const cookieParser = require('cookie-parser');
// const express      = require('express');
// const favicon      = require('serve-favicon');
// const hbs          = require('hbs');
// const mongoose     = require('mongoose');
// const logger       = require('morgan');
// const path         = require('path');
// const cors         = require("cors");

// const session       = require('express-session');
// const passport      = require('passport');

// require('./configs/passport');

// mongoose
// .connect('mongodb://localhost/backend', {
//   //.connect(process.env.MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

// const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// const app = express();

// // allow access to the API from different domains/origins
// app.use(cors({
//   // this could be multiple domains/origins, but we will allow just our React app
//   origin: [ "http://localhost:3000" ]
// }));


// // Middleware Setup
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// app.use(passport.initialize());
// app.use(passport.session());

// // default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';


// const index = require('./routes/index');
// const authRoutes = require('./routes/auth-routes');
// app.use('/', index);
// app.use('/', require('./routes/product-routes'));
// app.use('/', require('./routes/profile-routes'));
// app.use('/api', authRoutes);

// module.exports = app;
require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require("cors");

const session       = require('express-session');
const passport      = require('passport');

require('./configs/passport');

mongoose
.connect('mongodb://localhost/backend', {
  //.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.setHeader('Access-Control-Allow-Origin', 'http://time-is-money-dude.s3-website.eu-west-2.amazonaws.com');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//allow access to the API from different domains/origins
app.use(cors({
  credentials: true,
  // this could be multiple domains/origins, but we will allow just our React app
  origin: ["http://localhost:3000", "http://time-is-money-dude.s3-website.eu-west-2.amazonaws.com"],
  // vary: "http://time-is-money-dude.s3-website.eu-west-2.amazonaws.com"
  })
);


const index = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
app.use('/', index);
app.use('/', require('./routes/product-routes'));
app.use('/', require('./routes/profile-routes'));
app.use('/api', authRoutes);

module.exports = app;