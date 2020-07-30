const stripe = require('stripe')('sk_test_o0bGBiHFKdDeg6ZsiqqDXKK000PNnFMZkk'); // FIXME: put in process env

const OrderController = {};
// Helper function for calculating items
const calculateOrderAmount = (items) => {
  // TODO: Replace this constant with a calculation of the order's amount
  console.log(items);
  total = 0;
  for (item = 0; item < items.length; item++) {
    // eslint-disable-next-line max-len
    total += parseFloat(items[item].productPrice) * parseFloat(items[item].amount);
  }
  return total * 100;// convert to cents because stripe only uses cents
};

// POST
OrderController.createPaymentIntent = async (req, res) => {
  console.log('[DEBUG]: create payment intent has been called');
  //  console.log(req.body)
  const {
    cart
  } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cart),
    currency: 'aud',
    metadata: {integration_check: 'accept_a_payment'}
  }).catch((err) => err);

  console.log(paymentIntent);

  // // Send publishable key and PaymentIntent details to client
  res.send({
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret
  });
};

OrderController.pay = async (req, res) => {
  const {
    paymentMethodId,
    paymentIntentId,
    items,
    currency,
    useStripeSdk
  } = req.body;

  const orderAmount = calculateOrderAmount(items);

  try {
    let intent;
    if (paymentMethodId) {
      // Create new PaymentIntent with a PaymentMethod ID from the client.
      intent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: currency,
        payment_method: paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        use_stripe_sdk: useStripeSdk
      });
      // TODO: After create, if the PaymentIntent's status is succeeded, fulfill the order.
      console.log(intent);
    } else if (paymentIntentId) {
      // Confirm the PaymentIntent to finalize payment after handling a required action
      // on them client.
      intent = await stripe.paymentIntents.confirm(paymentIntentId);
      // TODO: After confirm, if the PaymentIntent's status is succeeded, fulfill the order. Send email here
      console.log(intent);
    }
    res.send(generateResponse(intent));
  } catch (e) {
    // TODO: Handle "hard declines" https://stripe.com/docs/declines/codes
    res.send({error: e.message});
  }
};

const generateResponse = (intent) => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case 'requires_action':
    case 'requires_source_action':
      // Card requires authentication
      return {
        requiresAction: true,
        clientSecret: intent.client_secret
      };
    case 'requires_payment_method':
    case 'requires_source':
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: 'Your card was denied, please provide a new payment method'
      };
    case 'succeeded':
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment received!');
      return {clientSecret: intent.client_secret};
  }
};

module.exports = OrderController;
