import {
  GET_PRODUCTS
} from './types'

const initialState = {
  totalPages: 0,
  currPage: 0,
  listType: 'Fruit and Vegetable', 
  productsList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case GET_PRODUCTS: {
      return {
        totalPages: action.payload.totalPages,
        currPage: action.payload.currPage,
        productsList: action.payload.items
      }
    }
    default: 
      return state 
  }
}

export default reducer