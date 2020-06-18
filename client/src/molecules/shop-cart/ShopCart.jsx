import React, { Component } from 'react'

import { connect } from 'react-redux'
import Button from '../../elements/button'
import { Link } from 'react-router-dom'
import styles from './ShopCart.css' 
import StateManager from 'react-select'
import { MinusCircle } from 'react-feather'
import { removeFromCart } from '../../state/ducks/shopCart/actions'

class ShopCart extends Component{
  constructor(props){
    super(props)
  }

  onDelete = (productName) => () =>  {
    const {
      removeFromCartConnect
    } = this.props

    // Delete from the redux state
    removeFromCartConnect(productName)
  }

  render(){
    const {
      totalPrice,
      cart
    } = this.props

    let shopList = [] 
    cart.map(item => {
      // console.log('on the map')
      shopList.push(
        <li className={styles.shopListItem}>
          <p className={styles.amount}>{item.amount}x</p>
          <p className={styles.name}>{item.productName}</p>
          <p className={styles.price}>{item.productPrice}</p>
          <div onClick={this.onDelete(item.productName)}> <MinusCircle/> </div>
        </li>
      )
    })

    return(
      <div className={styles.container}>
        <div className={styles.orderSummary}>
          <Link to="/order" className={styles.checkOut}> <Button> Proceed to cart </Button> </Link>
          <ul className={styles.shoppingList}>
            <li className={styles.shopListItem}>
              <p className={styles.amount}>Amount</p>
              <p className={styles.name}>Name</p>
              <p className={styles.price}>Price</p>
            </li>
            {shopList}
          </ul>
          <h3 className={styles.totalPrice}>
            Total Price: ${totalPrice}
          </h3>
          <div>
            <p>
              <b>*NOTE*</b>
              Delivery fee is added to the price.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  totalPrice: state.shopCart.totalPrice,
  cart: state.shopCart.cart,
})

const mapDispatchToProps = {
  removeFromCartConnect: removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)