// app/services/passportStrategy.js

'use strict';

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../models/user');
const config = require('./../config');

/**
 * This function works as middleware at server.js to authenticate upcoming request's JWT so to keep client logged in.
 * The options below is to tell passport:
 * 1) in requests, where to extract encrypted JWT;
 * 2) use what 'secret' to decrypt out the JWT;
 * 3) in the database table - User, make a query to check if username exists in the table
 * This configuration reads the JWT from the http Authorization header with the scheme 'jwt'.
 * Then, set up Passport to use the JWT Strategy
 * @param {object} passport the passport object
 * @return {undefined} nothing returned
 */
function hookJWTStrategy(passport) {
  const options = {};

  // set up how to extract JWT from requests (from Authorization Header in HTTP request).
  // This function is an extractor works as a callback, with request as input, and returns the encoded JWT/null
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  // sercret will be used to decrypt the 'encrypted JWT'
  options.secretOrKey = config.keys.secret;
  // A JWT will always has expiry date.
  options.ignoreExpiration = false;

  // function JWTStrategy(JWTPayload, callback) is a 'verify' function
  // the argument 'JWTPayload' is a decoded JWT payload
  passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
    // find the first user instance in Sequelize User Model,
    // where email == JWTPayload.email
    User.findOne({where: {email: JWTPayload.email}}) // modified!!!!!
        .then(function(user) {
          if (!user) {
            console.log('hookJWTStrategy is called, but failure!');
            callback(null, false);
            return;
          }
          console.log('hookJWTStrategy is called, success!');
          callback(null, user);
        });
  }));
}

// export the hookJWTStrategy function
module.exports = hookJWTStrategy;
