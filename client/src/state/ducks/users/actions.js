import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './types'

export const login = params => (dispatch) => {
  // const {
  //   email,
  //   password
  // } = params.body
  console.log("[DEBUG]: Login action")
  console.log(params)
 // console.log(password)
  fetch('http://localhost:4000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then((res) => {
      console.log(res)
      dispatch({
        type:LOGIN,
        status: 'success',
        payload: res.json()
      })
    })
    .catch((err) => console.log(err))
}

export const logout = () => (dispatch) =>{
  dispatch({
    type: LOGOUT,
    status: 'success',
  })
}

export const register = params => (dispatch) => {
  console.log("[DEBUG]: register") 
  console.log(params)
  const {
    firstname,
    lastname,
    email,
    password,
    address,
  } = params

  fetch('http://localhost:4000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then((res) => {
      let payload = {
        firstname,
        lastname,
        email,
        password,
        address,
      } 
      dispatch({
        type: REGISTER,
        status: 'succcess',
        payload: payload
      })
    })
    .catch((err) => console.log(err))
} 