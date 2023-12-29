import {storageCtrl} from '../api/storageToken'
import { fn } from '../utils'


export async function authFetch(url, params){
    const token=await storageCtrl.getToken()


    const logout= async()=>{
        await storageCtrl.removeToken()
    }

    if(!token){
        logout()
    }   

     if(fn.hasTokenExpired(token)){
        logout()
     }
else{
    const paramsTemp={
        ...params,
        headers:{
            ...params?.headers,
            Authorization: `Bearer ${token}`
        }
    }

    try {

        return await fetch(url,paramsTemp)
        
    } catch (error) {
        throw error
    }
}
    
}