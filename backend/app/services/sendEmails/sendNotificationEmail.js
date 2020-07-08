// app/services/sendEmails
// service of sending order notification emails to admin

'use strict';

const sgMail = require('@sendgrid/mail');
const User = require('../../models/user');

console.log('[DEBUG] APIKey: ' + process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/**
 * To send order notification email to admin once an order is recieved
 * @param {object} req req.body.email
 *                     req.body.address
 *                     req.body.instructions
 *                     req.body.items
 * @param {object} res return notification of if sending emails successully
 * @return {undefined}
 */
const sendNotificationEmail = async (req, res) => {
  console.log('[DEBUG]: sendNotificationEmail');
  let rawUser;
  try {
    rawUser = await User.findOne({
      where: {email: req.body.email}
    });
  } catch (e) {
    res.status(404).send({error: e.message});
  }

  const user = rawUser.toJSON(); // user is JavaScript object
  console.log('[TEST] user object: ', user);

  const itemList = req.body.items;
  let itemsHTML = '';
  for (let i = 0; i < itemList.length; i++) {
    // console.log('[TEST]', itemList[i]);
    itemsHTML = itemsHTML +
       `${itemList[i].name} x ${itemList[i].amount} $${itemList[i].price}<br>`;
  }

  const msg = {
    to: 'hanlei9876@gmail.com', // to update to reciplytechnologies@gmail.com
    from: 'reciplytechnologies@gmail.com',
    subject: 'A new order came.',
    html: `Hi, there is a new order for ${user.firstname} ${user.lastname}
          at ${req.body.address}.<br><br>
          Additional Delivery Instructions: ${req.body.instructions}.<br><br>
          Your grocery lists:<br>
          ${itemsHTML}<br>`
  };

  // TODO: send email
  sgMail.send(msg).then(
      () => {
        // res.status(202).json('Order notification email has been sent succeffully.');
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

// sendNotificationEmail();
module.exports = sendNotificationEmail;
