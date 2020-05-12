const express = require('express');
const router = express.Router();

router.use(cors());

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/sendList', (req, res) => {
  const {
    grocery,
    total
  } = req.body;
  console.log(grocery);

  groceryList = '';

  for (item=0; item<grocery.length; item++) {
    // eslint-disable-next-line max-len
    groceryList = groceryList + `<br/>I need ${grocery[item].amount}x ${grocery[item].name} around this price $${grocery[item].price}`;
  }

  const msg = {
    to: 'kazuiwa809275@gmail.com',
    from: 'arvy.au@gmail.com',
    subject: 'Reciply Grocery List',
    html: `These are my groceries:<br/> ${groceryList}`
  };
  sgMail.send(msg)
      .catch((error) => {
        console.log(error);
      });

  res.status(200).send({
    status: 200,
    message: 'success'
  });
});

module.exports = router;
