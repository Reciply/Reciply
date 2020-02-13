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
      image,
      addToCart, 
    } = this.props

    return(
      <div className={styles.card}>
        <img src={image}/>

        <p className={styles.name}>{productName}</p>

        <div className={styles.price}>
          <h3>${productPrice || '0.00'}</h3>
          <p>fweiw</p>
        </div>

        <Button className={styles.addToCart} onClick={this.handleAddToCard}>Add to cart</Button>
      </div>
    )
  }
}

export default ProductCard