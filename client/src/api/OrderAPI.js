import config from 'config'

// This function is for creating a payment intent with the stripe API.
export const createPaymentIntent = (resolve) => {
  console.log('[DEBUG]: createPaymentIntent has been called')
  fetch(`${config.apiUrl}/orders/create-payment-intent`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then(object => {
      return object
    })
    .catch((err) => console.log(err))
}

export const saveOrder = async (payload, resolve, reject) =>{
  console.log('[DEBUG] saveOrder')
  //console.log(payload)
  fetch(`${config.apiUrl}/api/save-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then((res) => resolve(res.json()))
  .catch((err) => reject('Something went wrong')) 
}

export const sendConfirmEmail = async(orderID) => {
  console.log('[DEBUG]: sesndConfirmEmail')
  fetch(`${config.apiUrl}/api/send-email-confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({orderID: orderID})
  })
  .then((res) => console.log(res.json()))
  .catch((err) => console.log('Something went wrong')) 
}