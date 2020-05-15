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
  .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: LOGIN,
        status: 'success',
        payload: data
      })
      return { message: 'success'}
    
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

  fetch('http://localhost:4000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then((res) => {

      dispatch({
        type: REGISTER,
        status: 'succcess'
      })
    })
    .catch((err) => console.log(err))
} 