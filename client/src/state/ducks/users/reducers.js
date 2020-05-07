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
  switch (action.type){
    case REGISTER: {
      const {
        firstname,
        lastname,
        email,
        password,
        address,
      } = action.payload
    }

    case LOGIN: {
      console.log("[DEBUG]: REDUCER LOGIN")
      console.log(action.payload)
    }
  }
}
  

export default reducer