import React, { Component } from 'react'
import Button from '../../elements/button'
import { connect } from 'react-redux'

import styles from './OrderSummary.css'

class OrderSummary extends Component {
  render () {
    const {
      cart
    } = this.props
    return (
      <div>
        <div className={styles.orderSummary}>
          <Button className={styles.confirm}> Confirm Order </Button>
          {cart}
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
  cart: state.products.cart
})

export default connect(mapStateToProps)(OrderSummary)
