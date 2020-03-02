import {
  ADD_TO_CART
} from './types'

const initialState = {
  cart: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CART: {
      //Check if item exists
      const item = state.cart.findIndex(cartItem => cartItem.productName === action.payload.productName)
      if(!item){
        //If item exists 
        const newCart = state.cart.map((cartItem, index) => {
          if (cartItem.productName === action.payload.productName){
            //Increment amount 
            let newCartItem = cartItem
            newCartItem.amount += 1  
            return newCartItem
          } 
          //Leave item unchanged 
          return cartItem
        })
        return {
          ...state,
          cart: [...newCart] 
        }
      } else {
        // Create a new item
        return {
          ...state,
          cart: [...state.cart, {...action.payload, amount: 1}]
          }
      }
    }

    default: 
    return state 
  }
}

export default reducer