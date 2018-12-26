'use strict';

/*
  General requires
*/
const debug = require('debug')(`server:index`);
const express = require('express');
const path = require('path');
const requestLogger = require('morgan');
const favicon = require('serve-favicon');
const config = require('./lib/config');


const app = express();


/*
  Middleware setup
*/

/* 3rd party middleware */
app.use(favicon(path.join(__dirname, config('server:public'), 'favicon.ico')));
app.use(requestLogger(config('logger:format') || 'tiny'));
app.use(express.static(path.join(__dirname, config('server:public'))));



/*
  Displaying some Express related settings
*/
debug(`Application running with env = ${ app.get('env') }`);
debug(`Application running with NODE_ENV = ${ config('NODE_ENV') }`);
debug(`View Caching = ${ app.get('view cache') }`);

module.exports = app;