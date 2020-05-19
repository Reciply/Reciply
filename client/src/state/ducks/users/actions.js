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
    if (res.status === 200){
      return res.json()
    } else if (res.status === 404){
      dispatch({type: LOGIN, status: 'fail'})
    }
  })
    .then((data) => {
      console.log('[DEBUG]: data')
      console.log(data)
      dispatch({
        type: LOGIN,
        status: 'success',
        payload: data
      })
    
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: LOGIN,
        status: 'fail'
      })
    })
  

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