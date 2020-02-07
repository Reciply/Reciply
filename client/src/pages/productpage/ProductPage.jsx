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

  componentDidMount(){
    const { products, getProductsConnect } = this.props

    getProductsConnect({
      categoryId : '1-E5BEE36E',
      pageNumber : 1,
      pageSize : 24, 
      url : '/shop/browse/fruit-veg',
      formatObject : 'Fruit %26 Veg'
    })
  }
  
  render(){
    const { productsList } = this.props 

    return(
      <div className={styles.page}>
        <h1>Products that you searched for</h1>
        <h1>Fruit and Veg</h1>
        <div className={styles.products}>
         {productsList.map((value) => {
            return <ProductCard productName={value.name} image={value.image} productPrice={value.price}/> 
         })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productsList: state.products.productsList
})

const mapDispatchToProps = {
  getProductsConnect: getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)