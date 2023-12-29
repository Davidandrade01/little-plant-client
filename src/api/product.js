
import { filter, transform } from 'lodash'
import {ENV} from '../utils'


async function getLatestPublished(limite=6){

   
    try{
      const sortFilter= "sort=publishedAt:desc"
      const pagination=`pagination[limit]=${limite}`
      const populate="populate=*"
       const filters=`${sortFilter}&${pagination}&${populate}`
      const url= `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${filters}`
       const response= await fetch(url)
       if(response.status!==200) throw response
       return await response.json()
    }
 catch (error) {
    throw error
 }
}

async function searchProduct(text) {
   try {
      const searchTitleFilter = `filters[title][$contains][0]=${text}`;
     const searchTagFilter = `filters[tags][$contains]=${text}`;
     const searchCharacFilter = `filters[characteristics][$contains][1]=${text}`;
     const pagination = "pagination[pageSize]=100";
     const populate = "populate=*";
     const filters = `${searchTagFilter}&${pagination}&${populate}`;// teste apenas com tags
 
     const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${filters}`;
 
     const response = await fetch(url);
 
     if (response.status !== 200) throw response;
 
     return await response.json();
   } catch (error) {
     throw error;
   }
 }

 async function getProductById(productId){
   try {
      const populate="populate=*"
      const url= `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}/${productId}?${populate}`

      const response= await fetch(url)

      if (response.status!==200) throw response

      return await response.json()
      
   } catch (error) {
      throw error
   }
 }

export const productCtrl={
    getLatestPublished,
    searchProduct,
    getProductById,
}