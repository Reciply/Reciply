import React, { Component } from 'react'

import { connect } from 'react-redux'

import ProductList from '../../molecules/product-list'
import ProductController from '../../molecules/product-controller'
import ShopCart from '../../molecules/shop-cart'
import TopNav from '../../molecules/top-nav'
import { Redirect } from 'react-router-dom'

import styles from './ProductPage.css'

class ProductPage extends Component {
  render () {
    const {
      loggedIn    
    } = this.props

    if(!loggedIn) return <Redirect to={'/'}/>
  
    return (
      <div className={styles.page}>
        <TopNav/>
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
  loggedIn: state.users.isFetched
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
