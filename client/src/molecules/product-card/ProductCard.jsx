import React, { Component } from 'react'

import Button from '../../elements/button'

import styles from './ProductCard.css'

class ProductCard extends Component{
  constructor(props){
    super(props)
  }

  handleAddToCard = (encodeURIComponent) => {
    console.log("Add to cart")
  }

  // <ProductCard productName="Melon" productPrice="3.16" cupString="$4.90/1Kg" />
  render(){
    const {
      productName,
      productPrice,
      cupString,
      addToCard, 
    } = this.props

    return(
      <div className={styles.card}>
        <img src="https://cdn0.woolworths.media/content/wowproductimages/small/144803.jpg"/>

        <p className={styles.name}>{productName}</p>

        <h3>{productPrice}</h3>

        <Button className={styles.addToCart} onClick={this.handleAddToCard}>>Add to cart</Button>
      </div>
    )
  }
}

export default ProductCard