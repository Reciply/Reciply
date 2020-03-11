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
      categoryOptions,
      categorySelect
    } = this.state
    const {
      getCategoriesConnect,
      categories
    } = this.props

    getCategoriesConnect()
    // let promise = new Promise(() => getCategoriesConnect())
    // promise.then((res) => {
    //   console.log(res)
    //   console.log(categories)
    //   const parseCategories = []
    //   console.log(categories)
    //   categories.map(category => {
    //     parseCategories.push({
    //       label: category.Name,
    //       value: category.NodeId
    //     })
    //   })
  
    //   console.log(parseCategories)
  
    //   this.setState({
    //     categoryOptions: [ 
    //         ...parseCategories
    //     ]
    //   })
    // })
    // .catch(res => {
    //   console.log(res)
    // })
  }

  handleSelectCategory = (value) => {
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
      categoryName : categories[selectedCategory].Name
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

    this.setState({
      categorySelect: null
    })
    
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
      search
    } = this.state

    let categoryOptions = []

    categories.map(category => {
      categoryOptions.push({
        label: category.Name,
        value: category.NodeId
      })
    })

    return(
      <div className={styles.productController}>
          <div className={styles.searchBar}>
            <TextField
              name="search"
              className={styles.searchTxt}
              placeholder="Search ..."
              value={search}
              onChange={value => this.handleTextChange('search', value)}
            />
          </div>
          <Button className={styles.searchBtn} onClick={this.handleSearch}>
            <Search className={styles.searchIcon} />
          </Button>
          <Select
            className={styles.selectCat}
            options={categoryOptions}
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