import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './types'

const initialState = {
  isFetched: false,
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
      if (action.status === 'success'){
        return {
          ...state,
          isFetched: true,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          address: action.payload.address,
          token: action.payload.token
        }
      }
    }
    case LOGOUT: {
      //reset everything to initialState
      return {
        isFetched: false,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        jwt: '',
      }
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