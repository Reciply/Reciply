import {
  GET_PRODUCTS
} from './types'

export const getProducts = params => (dispatch) => {
  dispatch({
    type: GET_PRODUCTS,
    status: started,
  })
}