/*
enables "strict mode", a feature allowing for
placing functions/programs in a strict context
*/
'use strict';

// 1: import NPM dependencies (modules)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('sequelize');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const path = require('path');

const hookJWTStrategy = require('./services/passportStrategy'); // passport

const app = express(); // init express

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors This prevents CORS error from happening which occurs when developing using two frameworks

// hook the passport JWT strategy, where passport object is passed in.
hookJWTStrategy(passport);

// bundle API routes
const api = require('./routes/api')(passport);
app.use('/api', api);

// test route
app.get('/ping', (req, res) => {
  res.send({message: 'pong'});
});

// catch all routes
app.get('*', function(req, res) {
  console.log(req.body);
  res.send({message: 'invalid route'});
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('app is listening on port ' + port + '!');
});
