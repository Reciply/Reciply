import React from 'react'
import {useStripe, useElements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { connect } from 'react-redux'
import {
  clearCart
} from '../../state/ducks/shopCart/actions'
import { 
  MapPin,
  Truck,
  Phone,
  CreditCard, 
} from 'react-feather'

import CardSection from '../card-section'
import TextField from '../../elements/textfield'
import Button from '../../elements/button'
import { Redirect } from 'react-router-dom'
import { saveOrder, sendConfirmEmail } from '../../api/OrderAPI'
import config from 'config'

import styles from './CheckoutForm.css'

class CheckoutForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deliveryAddress: '',
      deliveryInstructions: '',
      mobileNumber: '',
      success: false
    }
  }

  handleChange = (name, value) =>{
    this.setState({
      [name]: value,
    })
  }


  handleSubmit = async (event) => {
    // Block native form submission.
    console.log('[DEBUG]: Handle submit')
    event.preventDefault()

    const {
      stripe,
      elements,
      cart,
      firstname,
      lastname,
      email,
      jwt,
      clearCartConnect
    } = this.props;

    const {
      deliveryInstructions,
      deliveryAddress,
      mobileNumber,
    } = this.state

    //TODO: check if empty 
    console.log(email)
   
   // return //TODO: remove this  later 

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }


    const paymentIntent = await fetch(`${config.apiUrl}/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        cart
      })
    })
    .then((res) => res.json())
    .then(object => {
      return object
    }).catch((err) => console.log(err)) 

    console.log(paymentIntent)

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name:  `${firstname} ${lastname}`,
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Success')
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        const promise = new Promise((resolve, reject) => {
          saveOrder({
            'name':`${firstname} ${lastname}`,
            'address': deliveryAddress,
            'email': email,
            'instructions': deliveryInstructions,
            'mobileNumber': mobileNumber,
            'items': cart.map((item) => {return {'name':item.productName, 'price': item.productPrice, 'amount': item.amount}})
          }, resolve, reject)
        })

        promise.then((res) => {
          //if response is successful
          console.log(res)
          sendConfirmEmail(res.orderId)
        })
        .catch(() =>{
          console.log('something went wrong saving your order')
        })
       
        clearCartConnect()
        this.setState({'success': true})
      }
    }
  };

  render() {
    const {
      deliveryAddress,
      deliveryInstructions,
      mobileNumber,
      success
    } = this.state

    console.log("[DEBUG]: render checkout form")

    if(success) return <Redirect to={'/confirmation'}/>

    const {stripe} = this.props;
    return (
      <form className={styles.checkOutForm} onSubmit={this.handleSubmit}>
        <div>
          <h3><MapPin/> Delivery address</h3>
          <TextField 
            name="deliveryAddress"
            type="text"
            placeholder="Address"
            value={deliveryAddress}
            onChange={value => this.handleChange('deliveryAddress', value)}
          />
        </div>
        <div>
          <h3><Truck /> When would you like your groceries delivered? </h3>
          <p>We can deliver in the next hour or 8AM to 10PM 7 days a week.</p>
          <TextField  
            name="deliveryInstructions"
            type="text"
            placeholder="Date and time you'd like to receive your groceries"
            value={deliveryInstructions}
            onChange={value => this.handleChange('deliveryInstructions', value)}
          /> 
        </div>
        <div>
          <h3> <Phone/> Mobile Number </h3>
          <p>We use your number to text or call you about your order</p>
          <TextField
            name="mobileNumber"
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={value => this.handleChange('mobileNumber', value)}        
          />
        </div>
        <div>
          <h3><CreditCard/> Credit </h3>
          <p>Please fill in the details</p>
          <CardSection />
        </div>        
        <Button type="submit" disabled={!stripe}>
          Confirm Order
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.users.isFetched,
  jwt: state.users.token,
  firstname: state.users.firstname,
  lastname: state.users.lastname,
  cart: state.shopCart.cart,
  email: state.users.email,
})

const mapDispatchToProps = {
  clearCartConnect: clearCart,
}
const ConnectedCheckoutForm = connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <ConnectedCheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm