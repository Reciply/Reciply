import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../../molecules/checkout-form'
import OrderSummary from '../../molecules/order-summary/OrderSummary'

import { Redirect } from 'react-router-dom'
import TopNav from '../../molecules/top-nav'

import styles from './OrderPage.css'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_bs9gcFqzGQn9v5FyDlPL3sVu00DK7P3kyz')

class OrderPage extends Component {
  render () {
    const {
      loggedIn    
    } = this.props
    
    if(!loggedIn){
      console.log('Redirect')
      return <Redirect to={'/'}/>
    }
    return (
      <div>
        <TopNav/>
        <div className={styles.deliveryForm}>
          <form>
          <Elements stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
          </form>
        </div>
        <div>
          <OrderSummary/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.users.isFetched
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
