import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CONFIRM_ORDER
} from './types'

const initialState = {
  totalPrice: parseFloat(0.00),
  cart: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Check if item exists
      const item = state.cart.find(cartItem => {
        return cartItem.productName === action.payload.productName
      })
      if (item) {
        // If item exists add price to total and increment amount
        let newTotal = state.totalPrice
 
        const newCart = state.cart.map((cartItem, index) => {
          if (cartItem.productName === action.payload.productName) {
            // Increment amount and add to the subTotal 
            let newCartItem = cartItem
            newCartItem.amount += 1
            newTotal = parseFloat(newTotal) + parseFloat(cartItem.productPrice)
            return newCartItem
          }
          // Leave item unchanged
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
          cart: [...state.cart, { ...action.payload, amount: 1}]
        }
      }
    }

    case REMOVE_FROM_CART: {
      // Check if the amount is 0
      // Else if remove 
      // Elses just decrement it 

      const item = state.cart.find(cartItem => {
        return cartItem.productName === action.payload
      })
      console.log(item)

      // console.log('[DEBUG]: remove cart')
      let newTotal = state.totalPrice
      if (item.amount > 1) {
        // Decrement Item
        const newCart = state.cart.map((cartItem) => {
          console.log(cartItem.productName + ' ' + action.payload)
          if (cartItem.productName === action.payload) {
            // Decrement amount and subtract to the total 
            let newCartItem = cartItem
            newCartItem.amount -= 1
            newTotal = parseFloat(newTotal) - parseFloat(cartItem.productPrice)
            if (newCartItem.amount > 0) {
              return newCartItem
            } else {
              return
            }
          }
          return cartItem
        })
        return {
          ...state,
          totalPrice: newTotal.toFixed(2),
          cart: [...newCart]
        }
      } else if (item.amount === 1) {
        const newCart = state.cart.filter(cartItem => {
          if (cartItem.productName === action.payload) {
            newTotal = parseFloat(newTotal) - parseFloat(cartItem.productPrice)
          }
          return cartItem.productName !== action.payload
        })
        return {
          ...state,
          totalPrice: newTotal.toFixed(2),
          cart: [...newCart]
        }
      }
    }

    case CONFIRM_ORDER:{
      console.log('[DEBUG]: confirm order')
    }
      break
    default:
    return state
  }
}

export default reducer