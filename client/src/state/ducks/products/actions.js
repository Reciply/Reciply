import {
  GET_PRODUCTS
} from './types'

export const getProducts = params => (dispatch) => {
  console.log('[DEBUG] : GET products')
  const {
    categoryId = '1-E5BEE36E',
    pageNumber = 1,
    pageSize = 24, 
    url = '/shop/browse/fruit-veg',
    formatObject = 'Fruit %26 Veg', 
  } = params 

  const WoolworthsAPI = "https://www.woolworths.com.au/apis/ui/browse/category" 

  // `${WoolworthsAPI}?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortType=TraderRelevance&url=${url}&formatObject={"name":"${formatObject}"}`
  fetch(`${WoolworthsAPI}?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortType=TraderRelevance&url=${url}&formatObject={"name":"${formatObject}"}`, {
    method: 'POST',
  })
    .then((res) => {
      if (res.status === 200) {
        let items = []

        res.json().then(object =>{
          object.Bundles.forEach(bundle =>{
            bundle.Products.forEach(product => {
              let item = {
                name: product.Name,
                price: product.Price,
                image: product.SmallImageFile,
              }
              items.push(item)
            })
          })
          dispatch({
            type: GET_PRODUCTS,
            status: 'success',
            payload: items
          })
        })
      } else if (res.status === 404 || res.status === 403) {
        // res.json().then(object => reject(object.message))
      }
    })
    .catch((err) => console.log(err))
}