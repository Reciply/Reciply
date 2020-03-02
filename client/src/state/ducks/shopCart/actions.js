import {
  ADD_TO_CART
} from './types'

export const addToCart = params => (dispatch) => {
  const item = {
    ...params, 
    amount: 1, 
  }

  dispatch({
    type: ADD_TO_CART,
    status: 'success',
    payload: item
  })
}