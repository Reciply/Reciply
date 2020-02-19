import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  SEARCH_PRODUCTS
} from './types'

const initialState = {
  totalPages: 0,
  currPage: 0,
  categories: [],
  productsList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case GET_PRODUCTS: {
      return {
        ...state,
        totalPages: action.payload.totalPages,
        currPage: action.payload.currPage,
        productsList: action.payload.items
      }
    }
    case GET_CATEGORIES:{
      // console.log(action.payload)
      return {
        ...state,
        categories: action.payload,
      }
    }
    case SEARCH_PRODUCTS:{
      return{
        ...state,
        totalPages: action.payload.totalPage,
        currPage: action.payload.currPage,
        productsList: action.payload.items
      }
    }
    default: 
      return state 
  }
}

export default reducer