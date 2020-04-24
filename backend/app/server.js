
// semi-colon ; is optional in Node.js and browser JavaScript
'use strict' // enables "strict mode", a feature allowing for placing functions/programs in a strict context

// 1: import NPM dependencies (modules)
var express = require('express')
var bodyParser = require('body-parser')
var cors = require("cors")
require('dotenv').config()
var sequelize = require('sequelize')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var path = require('path')

var hookJWTStrategy = require('./services/passportStrategy') // passport

var app = express() // init express

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use(cors()) // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors This prevents CORS error from happening which occurs when developing using two frameworks

// hook the passport JWT strategy, where passport object is passed in.
hookJWTStrategy(passport)

// bundle API routes
var api = require('./routes/api')(passport)
app.use('/api', api)

// test route
app.get('/ping', (req, res) => {
  res.send({ message: 'pong' })
})

// catch all routes
app.get('*', function (req, res) {
  console.log(req.body);
  res.send({ message: 'invalid route' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('app is listening on port ' + port + '!');
})
