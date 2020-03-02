import {
  GET_PRODUCTS,
  SEARCH_PRODUCTS,
  GET_CATEGORIES
} from './types'

export const getProducts = params => (dispatch) => {
  //TODO: add item
  const {
    categoryId,
    pageNumber,
    pageSize, 
    UrlFriendlyName,
    categoryName, 
  } = params 

  const WoolworthsAPI = "https://www.woolworths.com.au/apis/ui/browse/category" 

  // `${WoolworthsAPI}?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortType=TraderRelevance&url=${url}&formatObject={"name":"${formatObject}"}`
  fetch(`${WoolworthsAPI}?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortType=TraderRelevance&url=/shop/browse/${UrlFriendlyName}&formatObject={"name":"${escape(categoryName)}"}`, {
    method: 'POST',
  })
    .then((res) => {
      if (res.status === 200) {
        let payload = {
          category: categoryName,
          totalPages: 0,
          currPage: 0,
          items: []
        }

        res.json().then(object =>{
          payload.totalPages = Math.ceil(object.TotalRecordCount/pageSize)
          payload.currPage = pageNumber
          object.Bundles.forEach(bundle =>{
            bundle.Products.forEach(product => {
              const item = {
                name: product.Description.replace('<br>', ' '),
                price: (product.Price * 1.15).toFixed(2),
                cupString: product.CupString,
                isAvailable: product.IsAvailable,
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
  const {
    search,
    pageNumber,
    pageSize,
    resolve,
    reject
  } = params
  console.log('[DEBUG]: SearchProducts')

  const WoolworthsSearchApi = "https://www.woolworths.com.au/apis/ui/Search/products"

  fetch(`${WoolworthsSearchApi}?SearchTerm=${search}&PageSize=${pageSize}&PageNumber=${pageNumber}&SortType=TraderRelevance&Location=/shop/search/products?searchTerm=${search}&Passes=27`, {
    method: 'POST'
  })
  .then((res) => {
    let payload = {
      search,
      totalPages: 0,
      currPage: 0,
      items: []
    }
    res.json().then(object =>{
      payload.totalPages = Math.ceil(object.SearchResultsCount/pageSize)
      payload.currPage = pageNumber
      object.Products.forEach(bundle =>{
        bundle.Products.forEach(product => {
          const item = {
            name: product.Description.replace('<br>', ' '),
            price: (product.Price * 1.15).toFixed(2),
            cupString: product.CupString,
            isAvailable: product.IsAvailable,
            image: product.SmallImageFile,
          }
          payload.items.push(item)
        })
      })

      console.log(payload)
      dispatch({
        type: SEARCH_PRODUCTS,
        status: 'success',
        payload: payload
      })
    })
  })
  .catch((err) => {
    console.log('Error')
    console.log(err)
  })
}

export const getCategories = params => (dispatch) => {
  fetch('https://www.woolworths.com.au/apis/ui/PiesCategoriesWithSpecials',
    {method: 'GET'}
  )
  .then((res) => {
    if (res.status === 200) {
      let sortedCategories = [] 
      res.json().then(body => {
        body.Categories.map((category, index) => {
          if(category.NodeId !== "specialsgroup"){
            sortedCategories.push({
              NodeId: category.NodeId,
              Name: category.Description,
              UrlFriendlyName: category.UrlFriendlyName
            })
          }
        })

        dispatch({
          type: GET_CATEGORIES,
          status: 'success',
          payload: sortedCategories
        })

      })
    } else {
      return { status: 'fail', data: null }
    }
  })
}