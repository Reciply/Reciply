import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  getProducts
} from '../../state/ducks/products/actions'

import ProductList from '../../molecules/product-list'
import ProductController from '../../molecules/product-controller'

import styles from './ProductPage.css'

class ProductPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      search: '',
      categoryId: '1-E5BEE36E',
      pageNumber: 1,
      pageSize: 24,
      url: '/shop/browse/fruit-veg',
      formatObject: 'Fruit %26 Veg',
      search: '',
    }
  }

  // componentDidMount(){
  //   const {
  //     search,
  //     categoryId,
  //     pageNumber,
  //     pageSize,
  //     url,
  //     formatObject
  //   } = this.state
  //   const { getProductsConnect } = this.props
  //   getProductsConnect({
  //     categoryId : categoryId,
  //     pageNumber : pageNumber,
  //     pageSize : pageSize, 
  //     url : url,
  //     formatObject : formatObject
  //   })
  // }

  fetchCategoryPage = (e) => {
    const { getProductsConnect } = this.props
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

  handleChange = (name, value) =>{
    this.setState({
      [name]: value
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
      <div className={styles.page}>
        <ProductController/>
        <ProductList
          searchText
          categoryId
        /> 
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