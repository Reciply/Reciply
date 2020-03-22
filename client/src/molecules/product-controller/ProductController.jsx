import React, { Component } from 'react'


import { connect } from 'react-redux'
import {
  getProducts,
  searchProducts,
  getCategories, 
} from '../../state/ducks/products/actions'

import {
  Search
} from 'react-feather'

import TextField from '../../elements/textfield'
import Button from '../../elements/button'
import Select, { components } from 'react-select'
import Creatable from 'react-select/creatable'

import styles from './ProductController.css'

class ProductController extends Component{
  constructor(props){
    super(props)
    this.state = {
      categorySelect: null,
      categoryOptions: [],
      search: '',
    }
  }

  componentDidMount(){
    const {
      getCategoriesConnect,
    } = this.props
    getCategoriesConnect()
  }


  handleSearch = (value) => {

    const {
      searchProductsConnect,
      getProductsConnect,
      categories
    } = this.props
    if(value){
      const selectedCategory = categories.findIndex(c => c.NodeId === value.value)
    
      console.log(selectedCategory)
  
      if(selectedCategory >= 0){
        getProductsConnect({
          categoryId : categories[selectedCategory].NodeId,
          pageNumber : 1,
          pageSize : 36, 
          UrlFriendlyName : categories[selectedCategory].UrlFriendlyName,
          categoryName : categories[selectedCategory].Name
        })
      }else{
        searchProductsConnect({
          search: value.value,
          pageNumber: 1,
          pageSize: 24,
        })
      }
    }
  }

  render(){
    const {
      categories
    } = this.props

    const {
      search
    } = this.state

    let categoryOptions = []

    categories.map(category => {
      categoryOptions.push({
        label: category.Name,
        value: category.NodeId
      })
    })

    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <Search/>
          </components.DropdownIndicator>
        )
      );
    };
    

    return(
      <div className={styles.productController}>
          <Creatable
            components={{ DropdownIndicator }}
            placeholder="Select a category or Type to search"
            className={styles.selectCat}
            options={categoryOptions}
            onChange={value => this.handleSearch(value)}
            isClearable={true}
            formatCreateLabel={userInput => `Search for ${userInput}`}
          />  
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currPage: state.products.currPage,
  categories: state.products.categories,
  currCategory: state.products.currCategory
})

const mapDispatchToProps = {
  getProductsConnect: getProducts,
  getCategoriesConnect: getCategories,
  searchProductsConnect: searchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductController)