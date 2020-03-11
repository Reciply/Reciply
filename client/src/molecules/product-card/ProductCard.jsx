import React, { Component } from 'react'

import Button from '../../elements/button'
import { connect } from 'react-redux'
import {
  addToCart
} from '../../state/ducks/shopCart/actions'

import styles from './ProductCard.css'

class ProductCard extends Component{
  constructor(props){
    super(props)
  }

  handleAddToCard = () => {

    const {
      productName,
      productPrice,
      cupString,
      addToCartConnect
    } = this.props

    let item = {
      productName, productPrice, cupString
    }

    console.log(item)

    addToCartConnect(item)
    
  }

  // <ProductCard productName="Melon" productPrice="3.16" cupString="$4.90/1Kg" />
  render(){
    const {
      key,
      productName,
      productPrice,
      cupString,
      image,
      isAvailable
    } = this.props

    return(
      <div key={key} className={styles.card}>
        <img src={image}/>

        <p>{productName}</p>
          {
            isAvailable ? (
            <div className={styles.price}>
              <h3>${productPrice || '0.00'}</h3>
              <p>{cupString}</p>
            </div>
            ) :
            (<h3> Product not available </h3>)
          }

        <Button isDisabled={!isAvailable} className={styles.addToCart} onClick={this.handleAddToCard}>Add to cart</Button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  cart: state.shopCart.cart,
})

const mapDispatchToProps = {
  addToCartConnect: addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)