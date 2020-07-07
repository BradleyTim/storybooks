const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const dbconnection = require('./config/db');
const passportConfig = require('./config/passport');

// initialize app
const app = express();

// load env variables
dotenv.config({ path: './.env' });

// connect to db
dbconnection();

// load passport config
passportConfig(passport);

// logging to console in development
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// set handlebars templating engine
app.engine('.hbs', exphbs({ defaultLayout:'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// set path for public static dirs
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`app running in ${process.env.NODE_ENV} on port ${PORT}`));
