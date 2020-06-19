// app/controllers/orderSaving.js

'use strict';

const db = require('../services/database');
const Order = require('../models/order');

const orderSaving = {};

/**
 * To insert an input order into the table 'Orders' in DB
 * @param {object} req the request object
 * @param {object} res the reponse object
 * @return {undefined} result is: Order saved inn DB sccessfully.
 */
orderSaving.saveOrder = function(req, res) {
  console.log('[DEBUG]: saveOrder');
  console.log(req) 
  // first check if there are null in critical attributes
  if (!req.body.email || !req.body.address || !req.body.items) {
    console.log(new Error('the format of the order is invalid!'));
  } else {
    db.sync({alter: true}).then(function() {
      const newOrder = {
        userEmail: req.body.email,
        deliveryAddress: req.body.address,
        items: JSON.stringify(req.body.items),
        instructions: req.body.instructions
      };

      console.log(newOrder);
      Order.create(newOrder).then(
          ()=>{
            console.log('Order is saved successfully!');
            res.status(202).json('Order is saved in database successfully!');
          },
          (error) => {
            console.log(error);
            res.status(401).json('Order failed to be stored in database!');
          }
      );
    });

    /*
    (async () => {
      await db.sync({alter: true});

      const newOrder = {
        email: order.email,
        deliveryAddress: order.address,
        items: JSON.stringify(order.items),
        instructions: order.instructions
      };
      console.log(newOrder);
      await Order.create(newOrder);
    })();*/
  }
};


module.exports = orderSaving;
