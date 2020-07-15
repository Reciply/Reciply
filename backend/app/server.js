// semi-colon ; is optional in Node.js and browser JavaScript
"use strict"; // enables "strict mode", a feature allowing for placing functions/programs in a strict context

// 1: import NPM dependencies (modules)
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
var sequelize = require("sequelize");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var path = require("path");

var hookJWTStrategy = require("./services/passportStrategy"); // passport

var app = express(); // init express

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // convert JSON string in requests' body in  into a JavaScript object

// step-1: initailize a passport object
app.use(passport.initialize());

app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors This prevents CORS error from happening which occurs when developing using two frameworks

// step-2: configure the initialized passport object to hook the passport-JWT strategy
hookJWTStrategy(passport);

// bundle API routes
// step-3: after configuration, the passport object can be used for request authentication
const api = require('./routes/api')(passport);
app.use('/api', api);

// test route
app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

// catch all routes
app.get("*", function (req, res) {
  console.log(req.body);
  res.send({ message: "invalid route" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("app is listening on port " + port + "!");
});
