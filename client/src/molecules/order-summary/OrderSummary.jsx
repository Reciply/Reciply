import React, { Component } from 'react'
import Button from '../../elements/button'
import { connect } from 'react-redux'
import {
  confirmOrder
} from '../../state/ducks/shopCart/actions'

import styles from './OrderSummary.css'

class OrderSummary extends Component {

  render () {
    const {
      totalPrice,
      cart
    } = this.props
    console.log(cart)

    return (
      <div className={styles.orderSummary}>
        <h5>Shopping List</h5> 
        <ul className={styles.shopList}>
          <li className={styles.shopListItem}>
              <p className={styles.amount}>Amount</p>
              <p className={styles.name}>Name</p>
              <p className={styles.price}>Price</p>
          </li>
          {cart.map((value, index) => {
            console.log(value)
            return (
              <li key={index} className={styles.shopListItem}>
                <p className={styles.amount}>{value.amount}x</p>
                <p className={styles.name}>{value.productName}</p>
                <p className={styles.price}>${value.productPrice}</p> 
              </li>
            )
          })}
        </ul>
        <div className={styles.totalCost}>
          <h6>Total: ${totalPrice}</h6>
        </div>
        <div>
          <p>
            <b>*NOTE*</b>
            Delivery fee is added to the price.
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  totalPrice: state.shopCart.totalPrice,
  cart: state.shopCart.cart
})

const mapDispatchToProps = {
  confirmOrderConnect: confirmOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
