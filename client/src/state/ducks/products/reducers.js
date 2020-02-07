import {
  GET_PRODUCTS
} from './types'

const initialState = {
  productsList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case GET_PRODUCTS: {
      return {
        productsList: action.payload
      }
    }
    default: 
      return state 
  }
}

export default reducer