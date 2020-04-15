
//This function is for creating a payment intent with the stripe API.
export const createPaymentIntent = (resolve) => {
  console.log('[DEBUG]: createPaymentIntent has been called')
  fetch(`http://localhost:4000/orders/create-payment-intent`, {
    method: 'GET',
  })
  .then((res) => res.json())
  .then(object => {
    return object
  })
  .catch((err) => console.log(err))
}
