const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const dbconnection = require('./config/db');
const routes = require('./routes');

// initialize app
const app = express();

// load env variables
dotenv.config({ path: './.env' });

// connect to db
dbconnection();

// logging to console in development
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// set handlebars templating engine
app.engine('.hbs', exphbs({ defaultLayout:'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// routes
app.use('/', routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`app running in ${process.env.NODE_ENV} on port ${PORT}`));
