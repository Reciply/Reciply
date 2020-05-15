// app/controllers/orderSaving.js

'use strict';

const db = require('../services/database');
const Order = require('../models/order');

const orderSaving = {};

/**
 * To insert an input order into the table 'Orders' in DB
 * @param {JSON} orderJSON the order is a JSON string
 * @return {undefined} result is: Order saved inn DB sccessfully.
 */
orderSaving.saveOrder = function(orderJSON) {
  console.log('[DEBUG]: saveOrder');
  const order = JSON.parse(orderJSON); // convert JSON string into a JavaScript object

  // first check if there are null in critical attributes
  if (!order.email || !order.address || !order.items) {
    console.log(new Error('the format of the order is invalid!'));
  } else {
    db.sync({alter: true}).then(function() {
      const newOrder = {
        userEmail: order.email,
        deliveryAddress: order.address,
        items: JSON.stringify(order.items),
        instructions: order.instructions
      };

      console.log(newOrder);
      Order.create(newOrder).then(
          ()=>{
            console.log('Order is saved successfully!');
          },
          (error) => {
            console.log(error);
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
