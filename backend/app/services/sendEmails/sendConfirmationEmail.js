// app/services/sendEmails
// service of sending order confirmation emails to customers

'use strict';

const sgMail = require('@sendgrid/mail');
const User = require('../../models/user');
const Order = require('../../models/order');

console.log('[DEBUG] APIKey: ' + process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/**
 * To send order confirmation email to customer after the order is paid by the customer
 * @param {object} req req.body.orderID the postcode provided by a customer,
 *                     which is an integer starting from 1.
 * @param {object} res return notification of if sending emails successully
 * @return {undefined}
 */
const sendConformationEmail = async (req, res) => {
  console.log('[DEBUG]: sendConformationEmail');
  let rawOrder;
  try {
    // User.hasMany(Order)
    // Order.belongsTo(User)
    rawOrder = await Order.findOne({
      where: {id: req.body.orderID},
      include: [{model: User, required: true}] // set 'required' as true to indicate Inner Join
    });
  } catch (e) {
    res.status(404).send({error: e.message});
  }

  const order = rawOrder.toJSON(); // order is JavaScript object
  // console.log(typeof(order.items)); // string
  const itemList = JSON.parse(order.items);

  // console.log('[TEST] the whole order object: ' + order); // fail to log 'order'
  console.log('[TEST] the whole order object: ', order);
  console.log(typeof(itemList)); // JavaScript object

  let itemsHTML = '';
  for (let i = 0; i < itemList.length; i++) {
    // console.log('[TEST]', itemList[i]);
    itemsHTML = itemsHTML +
       `${itemList[i].name} x ${itemList[i].amount} $${itemList[i].price}<br>`;
  }

  const msg = {
    to: order.userEmail,
    from: 'reciplytechnologies@gmail.com',
    subject: 'Congrats! Your order is confirmed!',
    html: `Hi ${order.user.firstname} ${order.user.lastname},<br>
          Your order has been confirmed. 
          Your grocery is being delivered to ${order.deliveryAddress}.
          With the instructions ${order.instructions}.<br><br>
          Your grocery lists:<br>
          ${itemsHTML}<br>
          If there is anything wrong with the information above 
          please contact.<br>
          Mobile: 04410924<br>
          Email: Rhys@gmail.com<br><br>Please don’t reply to this email.`
  };

  // TODO: send email
  sgMail.send(msg).then(
      () => {
        res.status(202).json('Order confirmation email has been sent succeffully.');
      },
      (error) => {
        res.status(400).json('BAD REQUEST');
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
  );
};

// sendConformationEmail();
module.exports = sendConformationEmail;
