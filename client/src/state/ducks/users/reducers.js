import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './types'

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  address: '',
  jwt: '',
}

const reducer = (state = initialState, action) => {
  console.log('[DEBUG]: REDUCER')
  switch (action.type){
    case LOGIN: {
      console.log("[DEBUG]: REDUCER LOGIN")
      console.log(action.payload)
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        address: action.payload.address,
        token: action.payload.token
      }
    }
    case LOGOUT: {
      console.log("[DEBUG]: REDUCER LOGOUT")
      return state
    }
    case REGISTER:{
      console.log("DEBUG: REDUCER REGISTER")
      return state
    }
    break
    default: {
      return state
    }
  }
}
  

export default reducer