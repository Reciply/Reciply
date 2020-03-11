import React, { Component } from 'react'

import { connect } from 'react-redux'
import Button from '../../elements/button'

import styles from './ShopCart.css' 
import StateManager from 'react-select'

class ShopCart extends Component{
  constructor(props){
    super(props)
  }

  onDelete = (data) => () =>  {
    console.log(data)
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
          <div onClick={this.onDelete(item.productName)}> - </div>
        </li>
      )
    })

    console.log(totalPrice)

    return(
      <div className={styles.container}>
        <div className={styles.orderSummary}>
          <Button className={styles.checkOut}>Proceed to cart</Button>
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
              Disclaimer stuff and some links to some disclaimer as well as some privacy policies
              I am just filling all this up to see how good it looks like. Lorem ipsum blah blah 
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

export default connect(mapStateToProps)(ShopCart)