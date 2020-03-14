import {
  ADD_TO_CART, REMOVE_FROM_CART
} from './types'

const initialState = {
  totalPrice: parseFloat(0.00),
  cart: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CART: {
      //Check if item exists
      const item = state.cart.find(cartItem => {
        return cartItem.productName===action.payload.productName
      })
      if(item){
        //If item exists add price to total and increment amount  
        let newTotal = state.totalPrice 
 
        const newCart = state.cart.map((cartItem, index) => {
          if (cartItem.productName === action.payload.productName){
            //Increment amount and add to the subTotal 
            let newCartItem =   cartItem
            newCartItem.amount += 1
            newTotal = parseFloat(newTotal) + parseFloat(cartItem.productPrice)
            return newCartItem
          } 
          //Leave item unchanged 
          return cartItem
        })
        return {
          ...state,
          totalPrice: newTotal.toFixed(2), 
          cart: [...newCart] 
        }
      } else {
        // Create a new item and add it to the totalPrice
        const newTotal = parseFloat(state.totalPrice) + parseFloat(action.payload.productPrice)
        return {
          ...state,
          totalPrice: newTotal.toFixed(2),
          cart: [...state.cart, {...action.payload, amount: 1}]
        }
      }
    }

    case REMOVE_FROM_CART: {
      return state 
    }

    default: 
    return state 
  }
}



export default reducer