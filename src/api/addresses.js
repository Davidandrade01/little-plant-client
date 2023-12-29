import { ENV } from "../utils";
import {authFetch} from '../lib'


async function getAllAddresses(userId){


    try {
        const filter= `filters[user][id][$eq]=${userId}`// de acordo com o insomnia
        const url= `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}?${filter}`
      
        const response = await authFetch(url)
        if(response.status!==200)throw response
       return await response.json()
    } catch (error) {
        throw error
    }
}

async function createAddresses(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            user: userId,
          },
        }),
      };
  
      const response = await authFetch(url, params);
  
      if (response.status !== 200) throw response;
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async function getAddressById(addressId){
    try {
      
      const url=`${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`
      const response= await authFetch(url)
      if(response.status!==200) throw response
     const res= await response.json()
     return {...res.data.attributes,id:res.data.id} //isto foi feito para diminuir a chamada e entrar mais no objeto

    } catch (error) {
      throw error
    }
  }

  async function updateAddress(addressId,data){

    try {
     const url=`${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`
       const params={
        method:"PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          data
        })
      
      }
      const response= await authFetch(url,params)
      if(response.status!==200)throw response 
      return response.json()

    
    } catch (error) {
      throw error
    }
  }

  async function deleteAddress(addressId){

   try {
    const url=`${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`
    const params={
      method:
        "DELETE",
      
     
      
    }
    const response= await authFetch(url,params)
    if(response.status!==200) throw response
    return await response.json()
   } catch (error) {
    throw error
   }
  }


export const addressesCtrl={
    getAllAddresses,
    createAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
}