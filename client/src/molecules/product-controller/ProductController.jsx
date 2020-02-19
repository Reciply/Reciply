import React, { Component } from 'react'


import { connect } from 'react-redux'
import {
  getProducts,
  searchProducts,
  getCategories, 
} from '../../state/ducks/products/actions'

import TextField from '../../elements/textfield'
import Button from '../../elements/button'
import Select from 'react-select'

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
      categorySelect
    } = this.state
    const {
      getCategoriesConnect,
      categories
    } = this.props
    
    getCategoriesConnect()
  }

  handleSelectCategory = (value) => {
    const {
      search
    } = this.state

    const {
      getProductsConnect,
      categories
    } = this.props

    this.setState({
      search: '',
      categorySelect: value
    })

    const selectedCategory = categories.findIndex(c => c.NodeId === value.value)

    console.log(selectedCategory)

    getProductsConnect({
      categoryId : categories[selectedCategory].NodeId,
      pageNumber : 1,
      pageSize : 36, 
      UrlFriendlyName : categories[selectedCategory].UrlFriendlyName,
      formatObject : categories[selectedCategory].Name
    })
  }

  handleTextChange = (name, value) => {
    this.setState({
      [name]: value 
    })    
  }

  handleSearch = () => {
    const {
      search
    } = this.state
    const {
      searchProductsConnect
    } = this.props

    console.log(search)
    if (search){
      searchProductsConnect({
        search: search,
        pageNumber: 1,
        pageSize: 24,
      })
    }
  }

  render(){
    const {
      categories
    } = this.props

    const {
      categorySelect,
      search
    } = this.state

    const categoryOptions = []

    categories.map(category => {
      categoryOptions.push({
        label: category.Name,
        value: category.NodeId
      })
    })

    return(
      <div className={styles.productController}>
          <TextField
            name="search" 
            className={styles.searchBar}
            placeholder="Search ..."
            value={search}
            onChange={value => this.handleTextChange('search', value)}
          />
          <Button onClick={this.handleSearch}>Search</Button>
          <Select 
            options={categoryOptions}
            value={categorySelect || categoryOptions[0] || null}
            onChange={value => this.handleSelectCategory(value)}
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