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
  }

  fetchPage = (e) => {
    const {
      getProductsConnect,
      searchFor,
      byCategory,
      categories
    } = this.props

    const pageNum = e.target.value
    if(!searchFor && byCategory){
      const currentCategory = categories[categories.findIndex(c => c.Name === byCategory)]
      console.log(currentCategory)
      const promise = new Promise((resolve, reject) => {
      getProductsConnect({
        categoryId : currentCategory.NodeId,
        pageNumber : pageNum,
        pageSize : 36, 
        url : currentCategory.UrlFriendlyName,
        categoryName : currentCategory.Name
      }, resolve, reject)
      })
      promise.catch((res) => {
        console.log("Something went wrong with fetching the page")
      })
      this.setState({
        pageNumber: pageNum
      })
    } else if (searchFor && !byCategory){

    }
  }

  render(){
    const {
      productsList,
      totalPages,
      currPage,
      byCategory
    } = this.props 


    let pageList = []
    for (var pageNumber = 1; pageNumber < totalPages+1; pageNumber++){
      pageList.push(<button value={pageNumber} onClick={(e) => this.fetchPage(e)}>{pageNumber}</button>)
      
    }

    return(
      <div className={styles.container}>
        <h1>{byCategory}</h1>
        <div className={styles.products}>
         {productsList.map((value, index) => {
            return (
              <ProductCard
                key= {index}
                isAvailable={value.isAvailable}
                productName={value.name}
                image={value.image}
                cupString={value.cupString}
                productPrice={value.price}
                addToCart={this.handleAddToCart}
              />
            ) 
         })}
        </div>

        <div className={styles.pagination}>
          
            {pageList}
       
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
})

const mapDispatchToProps = {
  getProductsConnect: getProducts,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)