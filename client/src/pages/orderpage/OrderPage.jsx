import React, { Component } from 'react'

import { 
  MapPin,
  Truck,
  Phone,
  CreditCard, 
} from 'react-feather'

import TextField from '../../elements/textfield'
import Button from '../../elements/button'

import styles from './OrderPage.css'

class OrderPage extends Component{
  constructor(props){
    super(props)

    this.state = {
      errors: 'form error message',
    }
  }

  render(){
    const { 
      errors
    } = this.state

    return(
      <div>
        <div className={styles.topBar}>
          <div>Logo here</div>
        </div>
        <div className={styles.deliveryForm}>
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
          <div>
            <h3><CreditCard/> Add a payment method</h3> 
          </div>
        </div>
        <div className={styles.orderSummary}>
          <Button className={styles.confirm}>Confirm Order</Button> 
          {errors}
          <div>
            Subtotal
            Delivery
            Service Fee
            Estimated Taxes
          </div>
          <div className={styles.totalCost}>
            <h5>Total</h5>
          </div>
        </div> 

      </div>
    )
  }
}

export default OrderPage
