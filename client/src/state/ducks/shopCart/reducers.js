import {
  ADD_TO_CART
} from './types'

const initialState = {
  cart: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case (ADD_TO_CART): {
      //Add item to cart
      console.log('[DEBUG]: Add to cart ')
    }
  }
}

export default reducer