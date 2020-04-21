'use strict'
// This file will orchestrate our entire application's routing

// create a router object, which is a middleware to handle routes
// we can think of it as a 'mini-application'
// The top-level express object has a Router() method that creates a new router object
// Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application. 
var router = require('express').Router();

var config = require('../config');
var AuthController = require('../controllers/authController');


// accept passport instance as input
var APIRoutes = function(passport){
    // create a singup endpoint
    router.post('/signup', AuthController.signUp);

    // create an login endpoint
    router.post('/login', AuthController.authenticateUser);
    
    // test to access resouce with assigned JWT
    router.post('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.status(201).json({message: 'here is you profile!'});
    });


    // to-do: logout
    /** 
     * 1. client delete the cookie stored in browser
     * 2. redirect to login page
    */

    return router; // a middleware used in server.js
};

module.exports = APIRoutes;