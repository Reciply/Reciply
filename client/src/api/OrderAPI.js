
// This function is for creating a payment intent with the stripe API.
export const createPaymentIntent = (resolve) => {
  console.log('[DEBUG]: createPaymentIntent has been called')
  fetch('http://localhost:4000/orders/create-payment-intent', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then(object => {
      return object
    })
    .catch((err) => console.log(err))
}

export const saveOrder = (payload) =>{
  console.log('[DEBUG] saveOrder')
  //console.log(payload)
  fetch('http://localhost:4000/api/save-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) 
}