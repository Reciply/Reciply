import React, { Component } from 'react'
import Button from '../../elements/button'
import { connect } from 'react-redux'

import styles from './OrderSummary.css'

class OrderSummary extends Component {

  render () {
    const {
      cart
    } = this.props
    console.log(cart)
    return (
      <div>
        <div className={styles.orderSummary}>
          <Button className={styles.confirm}> Confirm Order </Button>
          <div>
            {cart.map((value, index) => {
              return (<div key={index}>somethings</div>)
            })}
          </div>
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

const mapStateToProps = state => ({
  cart: state.shopCart.cart
})

export default connect(mapStateToProps)(OrderSummary)
