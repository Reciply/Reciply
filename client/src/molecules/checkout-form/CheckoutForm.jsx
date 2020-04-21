import React from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'

import { 
  MapPin,
  Truck,
  Phone,
  CreditCard, 
} from 'react-feather'

import CardSection from '../card-section'
import TextField from '../../elements/textfield'
import Button from '../../elements/button'

import {createPaymentIntent} from '../../api/OrderAPI'

import styles from './CheckoutForm.css'

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    
    const paymentIntent = await fetch(`http://localhost:4000/orders/create-payment-intent`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then(object => {
      return object
    })


    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form clasasName={styles.deliveryForm} onSubmit={handleSubmit}>
      <div>
        <h3><MapPin/> Add delivery address</h3>
        <h6>UNIT NUMBER</h6>
        <TextField/>
        <h5>STREET NUMBER</h5>
        <TextField/>
        <h5>SUBURB</h5>
        <TextField/>
        <h5>POSTCODE</h5>
        <TextField/>
        <Button>Confirm</Button>
      </div>
      <div>
        <h3><Truck /> Delivery Instructions</h3>
        <TextField /> 
      </div>
      <div>
        <h3>  <Phone/> Mobile Number </h3>
        <p>We use your number to text or call you about your order</p>
        <TextField/>
      </div>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}