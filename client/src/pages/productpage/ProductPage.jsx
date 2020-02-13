import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  getProducts
} from '../../state/ducks/products/actions'
import { ArrowLeft, ArrowRight } from 'react-feather'

import ProductCard from '../../molecules/product-card'

import styles from './ProductPage.css'

class ProductPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchText: '',
      categoryId: '1-E5BEE36E',
      pageNumber: 1,
      pageSize: 24,
      url: '/shop/browse/fruit-veg',
      formatObject: 'Fruit %26 Veg' 
    }
  }

  componentDidMount(){
    const {
      categoryId,
      pageNumber,
      pageSize,
      url,
      formatObject
    } = this.state
    const { products, getProductsConnect } = this.props
    getProductsConnect({
      categoryId : categoryId,
      pageNumber : pageNumber,
      pageSize : pageSize, 
      url : url,
      formatObject : formatObject
    })
  }

  fetchPage = (e) => {
    const { getProductsConnect } = this.props
    const {
      categoryId,
      pageNumber,
      pageSize,
      url,
      formatObject
    } = this.state

    console.log(e.target.value)

    const pageNum = e.target.value

    const promise = new Promise((resolve, reject) => {
      getProductsConnect({
      categoryId : categoryId,
      pageNumber : pageNum,
      pageSize : pageSize, 
      url : url,
      formatObject : formatObject
      }, resolve, reject)
    })
    promise.then(() => {
      console.log(this.state)
    })
    .catch((res) => {
      console.log("something went wrong with turning the page")
    })

    this.setState({
      pageNumber: pageNum
    })
   
  }
  
  render(){
    const { productsList, totalPages, currPage } = this.props 

    let pageList = []
    for (var pageNumber = 1; pageNumber < totalPages+1; pageNumber++){
      if (pageNumber === currPage){
        pageList.push(<h2>{pageNumber}</h2>)
      } else {
        pageList.push(<button value={pageNumber} onClick={(e) => this.fetchPage(e)}>{pageNumber}</button>)
      }
    }


    return(
      <div className={styles.page}>
        <h1>Products that you searched for</h1>
        <h1>Fruit and Veg</h1>
        <div className={styles.products}>
         {productsList.map((value, index) => {
            return <ProductCard key={index} productName={value.name} image={value.image} productPrice={value.price}/> 
         })}
        </div>

        <div className={styles.pagination}>
          <ArrowLeft/>
          {pageList}     
          <ArrowRight/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currPage: state.products.currPage,
  totalPages: state.products.totalPages,
  productsList: state.products.productsList
})

const mapDispatchToProps = {
  getProductsConnect: getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)