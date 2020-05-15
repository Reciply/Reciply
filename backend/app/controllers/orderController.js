const stripe = require("stripe")(process.env.STRIPE_KEY);

var OrderController = {};
// Helper function for calculating items
const calculateOrderAmount = (items) => {
  // TODO: Replace this constant with a calculation of the order's amount

  return 1400;
};

// Get
OrderController.createPaymentIntent = async (req, res) => {
  console.log("[DEBUG]: create payment intent has been called");
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(1400),
    currency: "aud",
    metadata: { integration_check: "accept_a_payment" },
  });

  console.log(paymentIntent);

  // Send publishable key and PaymentIntent details to client
  res.send({
    id: paymentIntent.id,
  });
};

OrderController.pay = async (req, res) => {
  const {
    paymentMethodId,
    paymentIntentId,
    items,
    currency,
    useStripeSdk,
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
        confirmation_method: "manual",
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        use_stripe_sdk: useStripeSdk,
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
    res.send({ error: e.message });
  }
};

const generateResponse = (intent) => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case "requires_action":
    case "requires_source_action":
      // Card requires authentication
      return {
        requiresAction: true,
        clientSecret: intent.client_secret,
      };
    case "requires_payment_method":
    case "requires_source":
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: "Your card was denied, please provide a new payment method",
      };
    case "succeeded":
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log("💰 Payment received!");
      return { clientSecret: intent.client_secret };
  }
};

module.exports = OrderController;
