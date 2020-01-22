/**
 * 
 * @param {object} values - holds login information
 * @param {func} resolve - an async promise function
 * @param {func} reject - an async promise function
 */
export const login = async (values, resolve, reject) => {
  fetch(`localhost:3000/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (res.status === 200) {
        resolve(res.json())
      } else if (res.status === 404 || res.status === 403) {
        res.json().then(object => reject(object.message))
      }
    })
    .catch((err) => console.log(error))
}

/**
 * 
 * @param {integer} postCode postCode number
 * @param {func} resolve - an async promise function
 * @param {func} reject - an async promise function
 */
export const checkPostCode = async (postCode, resolve, reject) => {
  fetch(`http://localhost:4000/postCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'postCode': '2500'}),
  })
    .then((res) => {
      console.log("does this work")
      console.log(res)
      resolve(res.json())
      // if (res.status === 200) {
      //   resolve(res.json())
      // } else if (res.status === 404 || res.status === 403) {
      //   res.json().then(object => reject(object.message))
      // }
    })
    .catch((err) => console.log(err))
}
/**
 * 
 * @param {object} values - JSON object of registration information 
 * @param {func} resolve - promise async function
 * @param {func} reject - promise async function
 */
export const register = async (values, resolve, reject) => {
  fetch(`localhost:3000/user/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (res.status === 200) {
        resolve(res.json())
      } else if (res.status === 404 || res.status === 403) {
        res.json().then(object => reject(object.message))
      }
    })
    .catch((err) => console.log(error))
}