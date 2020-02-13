import {
  GET_PRODUCTS,
  SEARCH_PRODUCTS
} from './types'

export const getProducts = params => (dispatch) => {
  //TODO: add item
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
        let payload = {
          totalPages: 0,
          currPage: 0,
          items: []
        }

        res.json().then(object =>{
          payload.totalPages = Math.ceil(object.TotalRecordCount/pageSize)
          payload.currPage = pageNumber
          object.Bundles.forEach(bundle =>{
            bundle.Products.forEach(product => {
              let item = {
                name: product.Name,
                price: (product.Price * 1.15).toFixed(2),
                image: product.SmallImageFile,
              }
              payload.items.push(item)
            })
          })

          console.log(payload)
          dispatch({
            type: GET_PRODUCTS,
            status: 'success',
            payload: payload
          })
        })
      } else if (res.status === 404 || res.status === 403) {
        res.json().then(object => reject(object.message))
      }
    })
    .catch((err) => console.log(err))
}

export const searchProducts = params => (dispatch) => {
  
  const WoolworthsAPI = "https://www.woolworths.com.au/apis/ui/Search/products" 
}