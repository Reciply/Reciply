import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getProducts
} from '../../state/ducks/products/actions'
import { ArrowLeft, ArrowRight } from 'react-feather'

import ProductCard from '../../molecules/product-card'

import styles from './ProductList.css'

class ProductList extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchText: '',
      categoryId: '1-E5BEE36E',
      pageNumber: 1,
      pageSize: 24,
      url: '/shop/browse/fruit-veg',
      formatObject: 'Fruit %26 Veg',
      search: '',
    }
  }

  fetchCategoryPage = (e) => {
    const { 
      getProductsConnect
    } = this.props
    const {
      categoryId,
      pageNumber,
      pageSize,
      url,
      formatObject
    } = this.state
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
    const { 
      search 
    } = this.state
    const {
      productsList,
      totalPages,
      currPage
    } = this.props 

    let pageList = []
    for (var pageNumber = 1; pageNumber < totalPages+1; pageNumber++){
      if (pageNumber === currPage){
        pageList.push(<h2>{pageNumber}</h2>)
      } else if(!search){
        pageList.push(<button value={pageNumber} onClick={(e) => this.fetchCategoryPage(e)}>{pageNumber}</button>)
      } else if(search) {
        pageList.push(<button value={pageNumber} onClick={(e) => this.fetchSearch(e)}>{pageNumber}</button> )
      }
    }

    return(
      <div>
        <h1>Fruit and Veg</h1>
        <div className={styles.products}>
         {productsList.map((value, index) => {
            return (
              <ProductCard
                isAvailable={value.isAvailable}
                key={index}
                productName={value.name}
                image={value.image}
                cupString={value.cupString}
                productPrice={value.price}
              />
            ) 
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)