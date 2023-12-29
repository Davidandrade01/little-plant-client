
//api
import {authFetch }  from '../lib'

//CONSTANTS
import {ENV } from '../utils/constants'

async function payment(token, userId, products, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          userId,
          addressShipping: address,
        }),
      };
  
      const response = await authFetch(url, params);
     
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  async function getAll(userId) {
    try {
      const userFilter = `filters[user][id][$eq]=${userId}`;
      const sortFilter = "sort[0]=createdAt:desc";
      const filters = `${userFilter}&${sortFilter}`;
  
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}?${filters}`;
  
      const response = await authFetch(url);
  
      if (response.status !== 200) throw response;
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
 
  export const orderCtrl = {
    payment,
    getAll,
    
  };