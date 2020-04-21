import React, { Component } from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../../molecules/checkout-form'
import OrderSummary from '../../molecules/order-summary/OrderSummary'
import styles from './OrderPage.css'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_bs9gcFqzGQn9v5FyDlPL3sVu00DK7P3kyz')

class OrderPage extends Component {
  render () {
    return (
      <div>
        <div className={styles.deliveryForm}>
          <Elements stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        </div>
        <div>
          <OrderSummary/>
        </div>
      </div>
    )
  }
}

export default OrderPage
