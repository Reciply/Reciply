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