import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  getProducts
} from '../../state/ducks/products/actions'

import ProductCard from '../../molecules/product-card'

import styles from './ProductPage.css'

class ProductPage extends Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div className={styles.page}>
        <h1>Products that you searched for</h1>
        <h1>Fruit and Veg</h1>
        <div>
          <ProductCard productName="Melon" productPrice="3.16" cupString="$4.90/1Kg"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.proucts
})

const mapDispatchToProps = {
  getProducts: getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)