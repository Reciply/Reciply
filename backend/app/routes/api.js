'use strict';
// This file will orchestrate our entire application's routing

// create a router object, which is a middleware to handle routes
// we can think of it as a 'mini-application'
// The top-level express object has a Router() method that creates a new router object
// Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application.
const router = require('express').Router();
// const config = require('../config');
const AuthController = require('../controllers/authController');
const OrderController = require('../controllers/orderController');
const orderSaving = require('../controllers/orderSaving');
const searchPostcode = require('../services/findNearbyWoolies/searchWooliesInWollongong');
const sendConfirmationEmail = require('../services/sendEmails/sendConfirmationEmail');
const sendNotificationEmail = require('../services/sendEmails/sendNotificationEmail');

// router.use(cors())

// accept passport instance as input
const APIRoutes = function(passport) {
  // ============ User Endpoints ============ //
  // create a singup endpoint
  router.post('/signup', AuthController.signUp);

  // create an login endpoint
  router.post('/login', AuthController.authenticateUser);

  // test to access resouce with assigned JWT
  router.post('/profile', passport.authenticate('jwt', {session: false}), function(req, res) {
    res.status(201).json({message: 'here is you profile!'});
  });

  // ============ Order endpoints ============ //
  router.get('/create-payment-intent', OrderController.createPaymentIntent);
  router.post('/pay', OrderController.pay);

  // save order into Table "orders" in database & send order notification email
  router.post('/save-order', orderSaving.saveOrder, sendNotificationEmail);
  // router.post('/test', sendNotificationEmail);

  // create an endpoint for searchiong nnearby woolies withi Wollongong area according to postcode
  router.get('/search-woolies', searchPostcode.searchWoolies);

  // send order confirmation email to customer
  router.post('/send-email-confirmation', sendConfirmationEmail);

  return router; // a middleware used in server.js
};

module.exports = APIRoutes;
