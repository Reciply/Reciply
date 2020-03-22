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

class OrderPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: 'form error message',
      order: {
        unitNumber: '',
        streetNumber: '',
        suburb: '',
        postcode: '',
        deliveryInstructions: '',
        mobileNumber: '',
        nameOnCard: '',
        cardNumber: '',
        CVV: '',
        expirationMonth: '',
        expirationYear: ''
      }
    }
  }

  inputChange = (name,value) => {
    console.log(name);
    console.log(value);
    this.setState({

      order: {
        ...this.state.order,
        [name]:value
      }
    });
  }


  render() {
    const {
      errors,
      order
     
    } = this.state

    return (
      <div>
        <div className={styles.topBar}>
          <div>Logo here</div>
        </div>
        <div className={styles.deliveryForm}>
          <div>
            <h3><MapPin /> Add delivery address</h3>
            <h6>UNIT NUMBER</h6>
            <TextField name={'unitNumber'} value={order.unitNumber} onChange={value => this.inputChange('unitNumber', value)} />
            <h5>STREET NUMBER</h5>
            <TextField name={'streetNumber'} value={order.streetNumber} onChange={value=>this.inputChange('streetNumber', value)}/>
            <h5>SUBURB</h5>
            <TextField name={'suburb'} value={order.suburb} onChange={value => this.inputChange('suburb', value)}/>
            <h5>POSTCODE</h5>
            <TextField name={'postcode'} value={order.postcode} onChange={value => this.inputChange('postcode', value)}/>
            <Button>Confirm</Button>
          </div>
          <div>
            <h3><Truck /> Delivery Instructions</h3>
            <TextField name={'deliveryInstructions'} value={order.deliveryInstructions} onChange={value => this.inputChange('deliveryInstructions', value)}/>
          </div>
          <div>
            <h3>  <Phone /> Mobile Number </h3>
            <p>We use your number to text or call you about your order</p>
            <TextField name={'mobileNumber'} value={order.mobileNumber} onChange={value => this.inputChange('mobileNumber', value)}/>
          </div>
          <div>
            <h3><CreditCard /> Add a payment method</h3>
            <h5>Name on card</h5>
            <TextField name={'nameOnCard'} value={order.nameOnCard} onChange={value => this.inputChange('nameOnCard', value)}/>
            <h5>Card number</h5>
            <TextField name={'cardNumber'} value={order.cardNumber} onChange={value => this.inputChange('cardNumber', value)}/>
            <div className='row'>
              <div className='col-4'>
                <h5>CVV</h5>
                <TextField name={'CVV'} value={order.CVV} onChange={value => this.inputChange('CVV', value)}/>
              </div>
              <div className='col-8'>
                <h5>Expiration date</h5>
                <TextField type='number' placeholder='MM' min='2' name = {'expirationMonth'} value={order.expirationMonth} onChange={value => this.inputChange('expirationMonth', value)}/>
                <br></br>
                <TextField type='number' placeholder='YY' min='2' name = {'expirationYear'} value={order.expirationYear} onChange={value => this.inputChange('expirationYear', value)}/>
              </div>

            </div>
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
