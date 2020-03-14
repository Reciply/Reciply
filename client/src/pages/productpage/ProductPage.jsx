import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  getProducts
} from '../../state/ducks/products/actions'

import ProductList from '../../molecules/product-list'
import ProductController from '../../molecules/product-controller'
import ShopCart from '../../molecules/shop-cart'

import styles from './ProductPage.css'

class ProductPage extends Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      <div className={styles.page}>
        <ProductController/>
        <div className={styles.main}>
          <ProductList/>
          <ShopCart/> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currPage: state.products.currPage,
  totalPages: state.products.totalPages,
  productsList: state.products.productsList,
  searchFor: state.products.searchFor,
  byCategory: state.products.byCategory,
  categories: state.products.categories,
  productsList: state.products.productsList,
})

const mapDispatchToProps = {
  getProductsConnect: getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)